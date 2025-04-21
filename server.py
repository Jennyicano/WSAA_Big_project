# Create a server that will connect with the database.
import mysql.connector as mysql    
from mysql import mysql

db = mysql()

class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {'id': self.id, 'name': self.name}
