import json

# accept connection to unverified credit-g dataset
import ssl
ssl._create_default_https_context = ssl._create_unverified_context


# lale
import lale.operators
import lale.lib.aif360
import lale.lib.autoai_libs
# import lale.lib.autogen
import lale.lib.imblearn
import lale.lib.lale
import lale.lib.lightgbm
import lale.lib.pytorch
import lale.lib.sklearn
import lale.lib.tensorflow
import lale.lib.xgboost
from lale.json_operator import from_json
from lale.datasets import load_iris_df
from lale.datasets.openml import openml_datasets
import warnings
warnings.filterwarnings("ignore", category=DeprecationWarning)
from sklearn.exceptions import ConvergenceWarning
warnings.filterwarnings("ignore", category=ConvergenceWarning)
from scipy.optimize.linesearch import LineSearchWarning
warnings.filterwarnings("ignore", category=LineSearchWarning)
from lale.pretty_print import json_to_string
from sklearn import metrics
import lale.lib.spacy

global estimators
estimators = {}

global transformers
transformers = {}


def load_estimators():
    load_schemas(estimators, lale.operators.get_available_estimators())


def load_transformers():
    load_schemas(transformers, lale.operators.get_available_transformers())


def load_schemas(dict, operators):
    for op in operators:
        dict[op.name()] = {}
        load_schema("hyperparam_schema", dict, op)
        load_schema("input_schema_fit", dict, op)
        load_schema("input_schema_transform", dict, op)
        load_schema("input_schema_predict", dict, op)
        load_schema("input_schema_predict_proba", dict, op)
        load_schema("input_schema_decision_function", dict, op)
        load_schema("output_schema_transform", dict, op)
        load_schema("output_schema_predict", dict, op)
        load_schema("output_schema_predict_proba", dict, op)
        load_schema("output_schema_decision_function", dict, op)


def load_schema(schema, dict, op):
    try:
        call_schema = getattr(op, schema)
        # following line implicitly tests whether export is possible - throws error if not
        dict[op.name()][schema] = json_to_string(call_schema())
        dumped = json.dumps(call_schema())
        dumped = dumped.replace("-Infinity", "\"-Infinity\"")
        dumped = dumped.replace("Infinity", "\"Infinity\"")
        dumped = dumped.replace("NaN", "\"NaN\"")
        dict[op.name()][schema] = json.loads(dumped)
    except:
        print("Could not load " + schema + " for " + op.name())


def get_metadata_estimators():
    if len(estimators) is 0:
        load_estimators()
    return estimators


def get_metadata_estimator(name):
    if len(estimators) is 0:
        load_estimators()
    return estimators[name]


def get_metadata_transformers():
    if len(transformers) is 0:
        load_transformers()
    return transformers


def get_metadata_transformer(name):
    if len(transformers) is 0:
        load_transformers()
    return transformers[name]


# def run(pipeline_json):
#    optimizable = from_json(pipeline_json)
#    (X_train, y_train), (X_test, y_test) = load_iris_df()
#    fitted = optimizable.fit(X_train, y_train)
#    return {"metric": 0.97}


def optimize(pipeline_spec):
    # load training data
    (X_train, y_train), (X_test, y_test) = openml_datasets.fetch("credit-g", "classification")
    optimizable = from_json(pipeline_spec)
    optimized = optimizable.fit(X_train, y_train)
    # predict
    # predicted = optimized.predict(X_test)
    # score = metrics.accuracy_score(y_test, predicted)
    return [
        {
            "id": x,
            "pipeline": optimized.get_pipeline(x).to_json(),
            "metrics": {
                "loss": optimized.summary()["loss"][x],
                "accuracy": metrics.accuracy_score(y_test, optimized.get_pipeline(x).fit(X_train, y_train).predict(X_test)).item(),
                "f1": metrics.f1_score(y_test, optimized.get_pipeline(x).fit(X_train, y_train).predict(X_test)).item(),
                "precision": metrics.precision_score(y_test, optimized.get_pipeline(x).fit(X_train, y_train).predict(X_test)).item(),
                "recall": metrics.recall_score(y_test, optimized.get_pipeline(x).fit(X_train, y_train).predict(X_test)).item(),
                "roc_auc": metrics.roc_auc_score(y_test, optimized.get_pipeline(x).fit(X_train, y_train).predict(X_test)).item()
            }
        }
        for x in list(optimized.summary().index)
    ]


# #mock-up code for creating hyperopt_json, which would come from REST call
# from lale.lib.sklearn import PCA
# from lale.lib.lale import NoOp
# from lale.lib.sklearn import LogisticRegression
# from lale.lib.lale import Hyperopt
# pca = PCA(n_components=3)
# planned_pipeline = (pca | NoOp) >> LogisticRegression
# hyperopt_orig = Hyperopt(estimator=planned_pipeline, cv=3, max_evals=3)
# hyperopt_json = hyperopt_orig.to_json()
# import lale.pretty_print
# print(lale.pretty_print.schema_to_string(hyperopt_json) + '\n')
#
# #re-create the optimizer and fit it to the data
# import lale.json_operator
# hyperopt_from_json = lale.json_operator.from_json(hyperopt_json)
# import lale.datasets
# (train_X, train_y), (test_X, test_y) = lale.datasets.load_iris_df()
# hyperopt_trained = hyperopt_from_json.fit(train_X, train_y)
# predicted = hyperopt_trained.predict(test_X)
# import sklearn.metrics
# print(f'\naccuracy {sklearn.metrics.accuracy_score(predicted, test_y):.1%}\n')
#
# #turn best estimator back to JSON, which would be returned from REST call
# best_pipeline = hyperopt_trained.get_pipeline()
# best_json = best_pipeline.to_json()
# print(lale.pretty_print.schema_to_string(best_json))
