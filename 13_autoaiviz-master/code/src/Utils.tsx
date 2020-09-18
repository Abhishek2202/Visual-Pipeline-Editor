/*export const inTypes: { [InType: string]: boolean } = {
   Object: true,
    Undefined: true,
};

export const outTypes: { [outType: string]: boolean } = {
    Any: true,
    Array: true,
    Undefined: true,
};

export const categories: { [stage: string]: boolean } = {
    Data_Preprocessing: true,
    Data_transformation: true,
    Modelling: true,
    Feature_Engineering: true,
    Hyperparameter_Opti: true,
};
*/

export default class Utils {

    public static OPERATOR_STAGES: { [Stage: string]: string[] } = {

        "preprocessing": [
            "CCA", "FactorAnalysis", "FastICA", "FunctionTransformer", "KBinsDiscretizer", "MissingIndicator", "Normalizer",
            "PowerTransformer", "RobustScaler", "SampleBasedVoting", "SimpleImputer", "StandardScaler", "TfidfVectorizer",
        ],
        "transformation": [
            "Both", "KMeans", "LinearDiscriminantAnalysis", "MiniBatchKMeans", "Batching", "Binarizer", "ColumnTransformer", "DictionaryLearning",
            "GaussianRandomProjection", "IdentityWrapper", "IncrementalPCA", "Isomap", "KernelPCA", "LabelBinarizer", "LabelEncoder",
            "LatentDirichletAllocation", "LocallyLinearEmbedding", "MiniBatchDictionaryLearning", "MiniBatchKMeans", "MiniBatchSparsePCA",
            "MultiLabelBinarizer", "NMF", "NoOp", "Nystroem", "Observing", "OneHotEncoder", "OrdinalEncoder", "PCA", "PLSCanonical",
            "PLSRegression", "PLSSVD", "Project", "SparsePCA", "SparseRandomProjection", "TruncatedSVD"
        ],
        "featureengineering": [
            "AdditiveChi2Sampler", "BernoulliRBM", "ConcatFeatures", "FeatureAgglomeration", "MaxAbsScaler", "MinMaxScaler",
            "PolynomialFeatures", "QuantileTransformer", "RBFSampler", "RFE", "SelectKBest", "SkewedChi2Sampler"
        ],
        "modelling": [
            "ARDRegression", "AdaBoostClassifier", "AdaBoostRegressor", "BaggingClassifier", "BaselineClassifier", "BaselineRegressor",
            "BayesianRidge", "BernoulliNB", "Birch", "CalibratedClassifierCV", "ComplementNB", "DecisionTreeClassifier", "DecisionTreeRegressor",
            "ElasticNet", "ElasticNetCV", "ExtraTreesClassifier", "ExtraTreesRegressor", "GaussianNB", "GaussianProcessClassifier",
            "GaussianProcessRegressor", "GradientBoostingClassifier", "GradientBoostingRegressor", "GridSearchCV", "HuberRegressor",
            "KMeans", "KNeighborsClassifier", "KNeighborsRegressor", "KernelRidge", "LabelPropagation", "LabelSpreading", "Lars", "LarsCV",
            "Lasso", "LassoCV", "LassoLars", "LassoLarsCV", "LassoLarsIC", "LGBMClassifier", "LGBMRegressor", "LinearDiscriminantAnalysis", "LinearRegression", "LinearSVC",
            "LinearSVR", "LogisticRegression", "LogisticRegressionCV", "MLPClassifier", "MLPRegressor", "MiniBatchKMeans",
            "MultiTaskElasticNet", "MultiTaskElasticNetCV", "MultiTaskLasso", "MultiTaskLassoCV", "MultinomialNB", "NearestCentroid",
            "NuSVC", "NuSVR", "Observing", "OrthogonalMatchingPursuit", "OrthogonalMatchingPursuitCV", "PLSCanonical", "PLSRegression",
            "PassiveAggressiveClassifier", "PassiveAggressiveRegressor", "Perceptron", "QuadraticDiscriminantAnalysis", "RANSACRegressor",
            "RadiusNeighborsClassifier", "RadiusNeighborsRegressor", "RandomForestClassifier", "RandomForestRegressor", "Ridge", "RidgeCV",
            "RidgeClassifier", "RidgeClassifierCV", "SGDClassifier", "SGDRegressor", "SVC", "SVR", "TheilSenRegressor", "TopKVotingClassifier",
            "TransformedTargetRegressor", "VotingClassifier", "XGBClassifier", "XGBRegressor"
        ],
        "optimization": [
            "Hyperopt"
        ],
        //both_transformer_estimator:["Batching","Birch", "Both", "IdentityWrapper", "VotingClassifier", "Observing"],
    };

    public static getLabelForStageKey = (key:any) => {
        switch(key) {
            case "preprocessing":
                return "Data preprocessing";
            case "transformation":
                return "Data transformation";
            case "featureengineering":
                return "Feature engineering";
            case "modelling":
                return "Model selection";
            case "optimization":
                return "Optimization";
            default:
                throw Error("No class for key: '" + key + "'");
        }
    };

    private static encodeType = (type:any):string => {
        if(!type) {
            return "laleType: Any";
        }
        if(type.laleType) {
            return "laleType: " + type.laleType;
        }
        if(!type.type || type.type === "undefined") {
            return "laleType: Any";
        }
        if(type.type === "array") {
            return "array(" + Utils.encodeType(type.items) + ")";
        }
        return type.type;
    };

    private static getPropertyType = (property:any) => {
        if(property.anyOf) {
            const types = [];
            property.anyOf.map((value: any) => {
                types.push(Utils.encodeType(value));
            });
            return types;
        }
        else {
            return Utils.encodeType(property);
        }
    };

    private static getPropertyTypes = (properties:any) => {
        if(!properties) {
            throw new Error("no properties exist");
        }
        const result = {};
        Object.keys(properties).map((key) => {
            result[key] = Utils.getPropertyType(properties[key]);
        });
        return result;
    };

    public static getTransformerInType = (operator:any) => {
        return Utils.getPropertyTypes(operator.input_schema_transform.properties);
    };
    //two odd cases: NoOp with no items, MLB with no X.

    public static getTransformerOutType = (operator:any) => {
        return Utils.encodeType(operator.output_schema_transform);
    };

    public static getEstimatorInType = (operator:any) => {
        if(operator.input_schema_predict_proba) {
            return Utils.getPropertyTypes(operator.input_schema_predict_proba.properties);
        } else if (operator.input_schema_decision_function) {
            return Utils.getPropertyTypes(operator.input_schema_decision_function.properties);
        } else {
            return Utils.getPropertyTypes(operator.input_schema_predict.properties);
        }
    };

    public static getEstimatorOutType = (operator:any) => {
        if(operator.output_schema_predict_proba) {
            return Utils.encodeType(operator.output_schema_predict_proba);
        } else if (operator.output_schema_decision_function) {
            return Utils.encodeType(operator.output_schema_decision_function);
        } else {
            return Utils.encodeType(operator.output_schema_predict);
        }
    };

    public static isTransformer = (operator:any) => {
        return operator.input_schema_transform !== undefined;
    };

    public static isEstimator = (operator:any) => {
        return operator.input_schema_predict_proba || operator.input_schema_decision_function || operator.input_schema_predict;
    };

    public static isTransformerAndEstimator = (operator:any) => {
        return Utils.isTransformer(operator) && Utils.isEstimator(operator);
    };

    public static getInType = (operator:any) => {
        if (Utils.isTransformerAndEstimator(operator)) {
            const intype = Utils.getTransformerInType(operator);
            const intype_est = Utils.getEstimatorInType(operator);
            /* TODO if (intype_est !== intype) {
                const msg = "Input schema conflict: transformer and estimator intype of operator inconsistent.";
                alert(msg);
                throw new Error(msg);
            }*/
            return intype;
        } else if (Utils.isTransformer(operator)) {
            return Utils.getTransformerInType(operator);
        } else if (Utils.isEstimator(operator)) {
            return Utils.getEstimatorInType(operator);
        } else {
            const msg = "Could not determine intype of operator.";
            alert(msg);
            throw new Error(msg);
        }
    };

    public static getOutType = (operator:any) => {
        if (Utils.isTransformerAndEstimator(operator)) {
            const outtype = Utils.getTransformerOutType(operator);
            const outtype_est = Utils.getEstimatorOutType(operator);
            /* TODO if (outtype !== outtype_est) {
                const msg = "Output schema conflict: transformer and estimator outtype of operator inconsistent.";
                alert(msg);
                throw new Error(msg);
            }*/
            return outtype;
        } else if (Utils.isTransformer(operator)) {
            return Utils.getTransformerOutType(operator);
        } else if (Utils.isEstimator(operator)) {
            return Utils.getEstimatorOutType(operator);
        } else {
            const msg = "Could not determine outtype of operator.";
            alert(msg);
            throw new Error(msg);
        }
    };

    public static getStage = (operatorLabel:any) => {
        let stage = "UNKNOWN";
        Object.entries(Utils.OPERATOR_STAGES).map((entry, index) => {
            if(entry[1].includes(operatorLabel)) {
                stage = entry[0];
            }
        });
        if(stage === "UNKNOWN") {
            console.warn("'" + operatorLabel + "' not matched to a stage");
        }
        return stage;
    };

    public static replaceAll = (filter_label:any) => {
        while(filter_label.includes("array("))
            filter_label = filter_label.replace("array(","[");
        while(filter_label.includes(")"))
            filter_label = filter_label.replace(")","]");
        while(filter_label.includes("laleType: Any"))
            filter_label = filter_label.replace("laleType: Any","Any");
        return filter_label;
    }
}
