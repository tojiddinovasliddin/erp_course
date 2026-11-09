import pool from "../config/db.js"
import ErrorExteption from "../utils/error.js"

class CourseCategoryServer{
    async addCategory(req) {
        const { name } = req.body
        const check_name = await pool.query("select * from category where name = $1",[name])
        if (check_name.rows.length) {
            throw new ErrorExteption(409,"This category already added")
        }
        await pool.query("insert into category(name) values($1)", [name])
        return {
            status: 201,
            message: "The category added successfully"
        }
    }
    async deleteCategory(req) {
        const { category_id } = req.params
        let check_category = await pool.query("select * from category where id = $1 and status = $2", [category_id,'active'])
        if (!check_category.rows.length) {
            throw new ErrorExteption(404, "Category not found")
        }
        await pool.query("update category set status =$1 where id = $2", ['inactive',category_id])
        return {
            status: 200,
            message: "Category successfully deleted"
        }
    }
    async AllActiceCategory(req) {
        const all_category = await pool.query("select * from category where status = $1", ['active'])
        return {
            status: 200,
            data: all_category.rows
        }
    }
    async AllInacticeCategory(req) {
        const all_category = await pool.query("select * from category where status = $1", ['inactive'])
        return {
            status: 200,
            data: all_category.rows
        }
    }
    async AllCategory(req) {
        const all_category = await pool.query("select * from category")
        return {
            status: 200,
            data: all_category.rows
        }
    }
    async UpdateCategory(req) {
        const { category_id } = req.params
        const { name } = req.body
        const check_category = await pool.query("select * from category where id = $1",[category_id])
        if (!check_category) {
            throw new Error(400,"Category not found");
        }

        await pool.query("update category set name =$1 where id = $2", [name, category_id])
        return {
            status: 201,
            message:"Category update successfully"
        }

    }
    async changeActive(req) {

        const { category_id } = req.params
        const check_category = await pool.query("select * from category where id = $1 and status !=$2", [category_id,'active'])
        if (!check_category.rows.length) {
            throw new ErrorExteption(400, "Category not found")
        }
        await pool.query("update category set status = $1 where id = $2", ['active', category_id])
        return {
            status: 201,
            message: "Update successfully"
        }
    }

}

const courseCategoryServer = new CourseCategoryServer()
export default courseCategoryServer
