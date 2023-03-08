import jwt from 'jsonwebtoken';
import _ from 'lodash';
export const generateAccessToken = ({ _doc: data }) => {
    const { password, __v, updatedAt, createdAt, roleId, ...ortherData } = data;
    const filterData = {
        ...ortherData,
        role: data.roleId.name,
    };
    console.log('filterData', filterData);
    return jwt.sign(filterData, process.env.JWT_ACCESS_KEY, { expiresIn: '30d' });
};

export const generateRefreshToken = ({ _doc: data }) => {
    const { password, __v, updatedAt, createdAt, ...ortherData } = data;
    const filterData = {
        ...ortherData,
        role: data.roleId.name,
    };
    return jwt.sign(filterData, process.env.JWT_REFRESH_KEY, { expiresIn: '30d' });
};
