class Config(object):
  pass

class ProdConfig(Config):
  pass

class DevConfig(Config):
  DEBUG = True
  SQLALCHEMY_DATABASE_URI = "mysql+pymysql://nautilis:nautilis123@127.0.0.1:3306/web_db"
