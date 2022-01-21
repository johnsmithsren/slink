import 'egg';
import Jwt from 'egg-jwt'
declare module 'egg' {
    jwt: Jwt
}