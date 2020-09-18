from setuptools import setup
import logging
logger = logging.getLogger(__name__)
logger.addHandler(logging.StreamHandler())

setup(
    name='laleapi',
    version='0.1',
    author="Daniel Karl I. Weidele",
    description="Lale API",
    url="",
    python_requires='>=3.6',
    packages=['laleapi'],
    install_requires=[
        "flask",
        "flask-cors",
        "lale[full] @ git+https://git@github.com/IBM/lale.git@master#egg=lale[full]"
    ]
)

