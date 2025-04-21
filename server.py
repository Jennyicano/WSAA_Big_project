# Create a server that will connect with the database.
import mysql.connector
from dbconfig import mysql as db 

conn = mysql.connector.connect(**db)
cursor = conn.cursor(dictionary=True)

cursor.execute("SELECT * FROM items")
results = cursor.fetchall()

for row in results:
    print(row)
