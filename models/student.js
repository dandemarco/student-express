module.exports = (sequelize, DataTypes) => {

    let Student = sequelize.define('Student', {

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        starID: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        present: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })

    //force specifies whether to drop the table or not
    //true: drop table every time app restarts
    //false: keep table

    Student.sync( {force: true} ).then( () => {
        console.log('Synced student table ')
    })

    return Student
    
}