import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize'
import {sequelize} from '../db'

export interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  id: CreationOptional<number>,
  login: string,
  password: string
  username: string
}

export interface ReviewModel extends Model<InferAttributes<ReviewModel>, InferCreationAttributes<ReviewModel>> {
  id: CreationOptional<number>
  text: string
  criteria: object
  movieId: number
  movieName: string
  userId: number
}

export const User = sequelize.define<UserModel>('users', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  login: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING},
  username: {type: DataTypes.STRING}
})

export const Review = sequelize.define<ReviewModel>('review', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  text: {type: DataTypes.STRING},
  criteria: {type: DataTypes.JSON},
  movieId: {type: DataTypes.INTEGER},
  movieName: {type: DataTypes.STRING},
  userId: {
    type: DataTypes.INTEGER, references: {
      model: User,
      key: 'id'
    }
  }
})

User.hasMany(Review)
Review.belongsTo(User)