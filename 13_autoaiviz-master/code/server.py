from flask import Flask, jsonify, request
from flask_cors import CORS
import laleapi.lale as lale

app = Flask(__name__)
CORS(app)
app.config['JSONIFY_PRETTYPRINT_REGULAR']
app.url_map.strict_slashes = False


@app.route('/api/lale/metadata/estimators', methods=['GET'])
def get_metadata_estimators():
    return jsonify(lale.get_metadata_estimators())


@app.route('/api/lale/metadata/estimator/<name>', methods=['GET'])
def get_metadata_estimator(name):
    return jsonify(lale.get_metadata_estimator(name))


@app.route('/api/lale/metadata/transformers', methods=['GET'])
def get_metadata_transformers():
    return jsonify(lale.get_metadata_transformers())


@app.route('/api/lale/metadata/transformer/<name>', methods=['GET'])
def get_metadata_transformer(name):
    return jsonify(lale.get_metadata_transformer(name))


@app.route('/api/lale/optimization/run', methods=['POST'])
def lale_optimize():
    pipeline_spec = request.get_json()
    return jsonify(lale.optimize(pipeline_spec))


def run(port=8888, debug=False):
    app.run(port=port, debug=debug, threaded=True, host='0.0.0.0')


run()
