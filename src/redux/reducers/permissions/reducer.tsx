import { UserPermissionsTypes } from './types'
import { internalUserPermissions } from './helpers';

const initialState = {
    permissionsList: internalUserPermissions,
    hasFetched: false,
}

const PermissionsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case UserPermissionsTypes.SET_PERMISSIONS_LIST:
            return {
                ...state,
                permissionsList: action.payload,
                hasFetched: true,
            }
    
        default:
            return state
    }
}

export default PermissionsReducer