export class Recipe {
    private properties;
    private steps;

    constructor() {
        this.properties = new Map<string, any>();
        this.steps = new Array<Operator>();
    }

    setRecipeProperty = (property_name, property_value) => {
        return this.properties.set(property_name, property_value);
    };

    getRecipeProperty = (property_name) => {
        return this.properties.get(property_name);
    };

    addOperatorAtIndex = (operator, index) => {
        return this.steps.splice(index, 0, operator);
    };

    getOperatorAtIndex = (index) => {
        return this.steps[index];
    };

    static getChoiceOperator = () => {

    };

    static getParallelOperator = () => {

    };

    static getRecipeModel = () => {

    };

    toLaleJson = () => {
        //encode this
    };
}

export class Operator {
    private properties;
    private metadata;

    constructor(metadata) {
        this.properties = new Map<string, any>();
        this.metadata = new metadata;
    }

    setOperatorProperty = (property_name, property_value) => {
        return this.properties.set(property_name, property_value);
    };

    getOperatorProperty = (property_name) => {
        return this.properties.get(property_name);
    };
}

export class BranchOperator {

    private steps;
    private type;

    constructor(metadata, branchType: BranchType) {//call BranchType with what is called in lale, for eg: "choice" is one what is the other called?
        //super(metadata);
        this.steps = new Array<Operator>();
        this.type = branchType;
    }
}

export enum BranchType {
    choice,
    andOperator
}

export class choice extends Operator {

}

export class andOperator extends Operator {

}
/*{
export class Recipe {
    class: string;
    state: string;
    operator: string;
    label: string;
    documentation_url: string;
    hyperparams: Hyperparameters;
    steps: Steps;
    is_frozen_trainable: boolean;
}

export class Hyperparameters {
    estimator: Estimator;
    cv: number;
    max_evals: number;
}

export class Steps {
    pipeline: Pipeline;
}

export class Estimator {
    $ref: string;
}

export class Pipeline {
    class: string;
    state: string;
    edges: string[][];
    steps: Steps2;
}

export class Steps2 {
    choice: Choice;
    logistic_regression: LogisticRegression;
}

export class Choice {
    class: string;
    state: string;
    operator: string;
    steps: Steps3;
}

export class LogisticRegression {
    class: string;
    state: string;
    operator: string;
    label: string;
    documentation_url: string;
}

export class Steps3 {
    pca: Pca;
    no_op: NoOp;
}

export class Pca {
    class: string;
    state: string;
    operator: string;
    label: string;
    documentation_url: string;
    hyperparams: Hyperparameters2;
    is_frozen_trainable: boolean;
}

export class NoOp {
    class: string;
    state: string;
    operator: string;
    label: string;
    documentation_url: string;
    hyperparams?: any;
    is_frozen_trainable: boolean;
    coefs?: any;
    is_frozen_trained: boolean;
}

export class Hyperparameters2 {
    n_components: number;
}

//from lale.lib.sklearn import PCA
//from lale.lib.lale import NoOp
//from lale.lib.sklearn import LogisticRegression
//from lale.lib.lale import Hyperopt
//pca = PCA(n_components=3)
//planned_pipeline = (pca | NoOp) >> LogisticRegression
//hyperopt_orig = Hyperopt(estimator=planned_pipeline, cv=3, max_evals=3)
//hyperopt_json = hyperopt_orig.to_json()
//import lale.pretty_print
//print(lale.pretty_print.json_to_string(hyperopt_json) + '\n')

}*/