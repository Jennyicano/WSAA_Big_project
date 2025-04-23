# create  boardgamesDAO as a database access object (DAO) for the boardgames table
# Author: Jenny Ibanez Cano


import mysql.connector
import dbconfig as db 

class BoardgamesDAO:
    connection=""
    cursor=""
    host=""
    user=""
    password=""
    database=""
    
    def __init__(self):
        self.host = db.mysql['host']
        self.user = db.mysql['user']
        self.password = db.mysql['password']
        self.database = db.mysql['database']
        
    def getcursor(self):
        print("getcursor DAO")
        self.connection = mysql.connector.connect(
            host=self.host,
            user=self.user,
            password=self.password,
            database=self.database
        )
        print("cursor bb created")
        self.cursor = self.connection.cursor()
        print("cursor created")
        return self.cursor
    
    def closeAll(self):
        self.connection.close()
        self.cursor.close()
         
    def getAll(self):
        print("getAll DAO")
        cursor = self.getcursor()
        print("después del getcursor")
        sql="select * from Boardgames;"
        print("después del select * from boardgames")
        cursor.execute(sql)
        results = cursor.fetchall()
        returnArray = []
        #print(results)
        for result in results:
            #print(result)
            returnArray.append(self.convertToDictionary(result))
        
        self.closeAll()
        return returnArray

    def findByID(self, id):
        cursor = self.getcursor()
        sql="select * from Boardgames where id = %s;"
        values = (id,)

        cursor.execute(sql, values)
        result = cursor.fetchone()
        returnvalue = self.convertToDictionary(result)
        self.closeAll()
        return returnvalue

    def create(self, boardgame):
        cursor = self.getcursor()
        sql="insert into Boardgames (Name,Product_type, Age_range, Players, Price) values (%s,%s,%s,%s,%s);"
        values = (boardgame.get("Name"), boardgame.get("Product_type"), boardgame.get("Age_range"), boardgame.get("Players"), boardgame.get("Price"))
        cursor.execute(sql, values)

        self.connection.commit()
        newid = cursor.lastrowid
        boardgame["id"] = newid
        self.closeAll()
        return boardgame
    
    def update(self, id, boardgame):
        cursor = self.getcursor()
        sql="update Boardgames set Name= %s, Product_type=%s, Age_range=%s, Players=%s, Price=%s where id = %s;"
        
        values = (boardgame.get("Name"), boardgame.get("Product_type"), boardgame.get("Age_range"), boardgame.get("Players"), boardgame.get("Price"), id)
        cursor.execute(sql, values)
        self.connection.commit()
        self.closeAll()
        
    def delete(self, id):
        cursor = self.getcursor()
        sql="delete from Boardgames where id = %s;"
        values = (id,)
        cursor.execute(sql, values)
        self.connection.commit()
        self.closeAll()
        print("delete done")

    def convertToDictionary(self, resultLine):
        attkeys=['id','Name','Product_type', 'Age_range', 'Players', 'Price']
        boardgame = {}
        currentkey = 0
        for attrib in resultLine:
            boardgame[attkeys[currentkey]] = attrib
            currentkey = currentkey + 1 
        return boardgame

boardgamesDAO = BoardgamesDAO()