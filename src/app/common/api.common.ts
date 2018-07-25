import { environment } from "../../environments/environment";

export const apiURL = {
    //category api
    getCategories: getUrl('admin/category/list'),
    createCategory: getUrl('admin/category/create'),
    updateCategory: getUrl('admin/category/update'),
    deleteCategory: getUrl('admin/category/delete'),
    //post api
    getPosts: getUrl('admin/post/list'),
    createPost: getUrl('admin/post/create'),
    updatePost: getUrl('admin/post/update'),
    uploadThumb: getUrl('admin/post/upload/thumb'),
    deletePost: getUrl('admin/post/delete'),
    approvePost: getUrl('admin/post/approve'),
    notifyPost: getUrl('admin/post/notify'),
    //user api
    getUsers: getUrl('admin/user/list'),
    createUser: getUrl('admin/user/create'),
    deleteUser: getUrl('admin/user/delete'),
    //auth api
    login: getUrl('auth/login'),
    //report
    getGeneralReport: getUrl('admin/report/general'),
    
}
function getUrl(endPoint: string) {
    return environment.baseURL + endPoint;
}