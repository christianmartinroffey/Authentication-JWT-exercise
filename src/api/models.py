from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(250), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    
    @staticmethod
    def get_with_credentials(email, password):
        return User.query.filter_by(email=email).filter_by(password=password).first()

    @classmethod
    def get_by_email(cls, email):
        user = cls.query.filter_by(email=email).one_or_none()
        return user