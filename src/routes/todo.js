const router = require('express').Router();

/* GET task listing. */
router.get('/', async function (req, res) {
    const result = await req.sql.query `select * from todo order by id`
    res.send(result.recordset)
});

/* GET single task. */
router.get('/:id', async function (req, res) {
    const result = await req.sql.query `select * from todo where id = ${req.params.id}`
    res.send(result.recordset)
});

/* POST create task. */
router.post('/', function (req, res) {
    const todo = JSON.stringify(req.body)
    new req.sql.Request()
    .input('todo', req.sql.NVarChar, todo)
    .execute('createTodo', (err, result) => {
        if (err) {
            console.log(err)
            res.status(400).send(err.message)
        } else {
            console.log(result)
            res.status(201).send(result)
        }
    })
});

/* PUT update task. */
router.put('/', async function (req, res) {
    const todo = JSON.stringify(req.body)
    new req.sql.Request()
    .input('id', req.sql.Int, req.params.id)
    .input('todo', req.sql.NVarChar, todo)
    .execute('updateTodo', (err, result) => {
        if (err) {
            console.log(err)
            res.status(400).send(err.message)
        } else {
            console.log(result)
            res.status(200).send(result)
        }
    })
});

/* DELETE single task. */
router.delete('/:id', async function (req, res) {
    const result = await req.sql.query `delete from todo where id = ${req.params.id}`
    res.send(result)
});

module.exports = router;


/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the todo.
 *         title:
 *           type: string
 *           description: title of todo.
 *         description:
 *           type: string
 *           description: description of todo.
 *         completed:
 *           type: boolean
 *           description: status of todo (completed - true / false).
 *         dueDate:
 *           type: string
 *           format: date
 *           description: due date to complete todo.
 *       example:
 *         id: 101
 *         title: "work todo"
 *         description: "description of work todo"
 *         completed: False
 *         dueDate: "2024-07-14"
 *
 * /todo:
 *   get:
 *     summary: Retrieve a list of todo items.
 *     tags:
 *       - Todo
 *     responses:
 *       '200':
 *         description: A list of todo items.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 *       '400':
 *         description: Bad request. Invalid parameters.
 *       '500':
 *         description: Internal server error.
 *
 *   post:
 *     summary: Create a new Todo.
 *     tags:
 *       - Todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       '201':
 *         description: Todo created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '500':
 *         description: Internal server error.
 *
 * /todo/{id}:
 *   get:
 *     summary: Retrieve an todo item by ID.
 *     tags:
 *       - Todo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the Todo item to retrieve.
 *     responses:
 *       '200':
 *         description: Todo found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       '404':
 *         description: Todo not found.
 *       '500':
 *         description: Internal server error.
 *
 *   put:
 *     summary: Update a Todo by ID.
 *     tags:
 *       - Todo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the Todo item to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       '200':
 *         description: Todo updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '404':
 *         description: Todo not found.
 *       '500':
 *         description: Internal server error.
 *
 *   delete:
 *     summary: Delete a Todo item by ID.
 *     tags:
 *       - Todo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the Todo item to delete.
 *     responses:
 *       '200':
 *         description: Todo item deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '404':
 *         description: Todo item not found.
 *       '500':
 *         description: Internal server error.
 */
