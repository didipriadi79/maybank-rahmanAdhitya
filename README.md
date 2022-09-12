# maybank

API ini menggunakan frameWork express.js,
silahkan clone untuk repository ini dengan jalankan command  $ npm i untuk menginstall seluruh library,
untuk menjalankan aplikasi jalankan command $ npm start

1. untuk membuat user baru jalankan POSTMAN gunakan method POST url http://localhost:2003/auth/register dengan menyertakan body-raw-JSON 
{
    "username":"<your user name>",
    "email":"<your email>",
    "password":"<your password>"
}

2. untuk login jalankan POSTMAN gunakan method POST url http://localhost:2003/auth/register dengan menyertakan body-raw-JSON
{
    "email":"<your email>",
    "password":"<your password>"
}

3. untuk mendapatakan seluruh category methode GET http://localhost:2003/category akan mendapatkan return 
  {
    "message": "get All Category Success",
    "result": [
        {
            "id": 1,
            "category_name": "post paid phone",
            "createdAt": "2022-09-10T07:51:19.000Z",
            "updatedAt": "2022-09-10T07:51:19.000Z"
        },
        {
            "id": 2,
            "category_name": "internet",
            "createdAt": "2022-09-10T07:51:30.000Z",
            "updatedAt": "2022-09-10T07:51:30.000Z"
        },
        {
            "id": 3,
            "category_name": "utility",
            "createdAt": "2022-09-10T07:51:48.000Z",
            "updatedAt": "2022-09-10T07:51:48.000Z"
        },
        {
            "id": 4,
            "category_name": "bank credit card",
            "createdAt": "2022-09-10T07:52:08.000Z",
            "updatedAt": "2022-09-10T07:52:08.000Z"
        }
    ]
}

4. untuk mendapatakn bills berdasarkan category method GET http://localhost:2003/bills/category dengan query params category_name sebagai key, 

5. untuk melakukan transaksi methode POST http://localhost:2003/transaction dengan menyertakan body-raw-JSON 
{
    "bill_id": <int>,
    "amount": <int>,
    "transaction_detail" :"<your description>",
    "customer_id":"<no hp/ nomer pelangan>"
}

6.untuk membuat category baru methode POST http://localhost:2003/bills/category dengan menyertakan body-raw-JSON
{
    "category_name":"<newCategory>"
}

7.untuk membuat bills baru methode POST http://localhost:2003/bills/new  dengan menyertakan body-raw-JSON 
{
    "product_name":"<product name>",
    "description":"<decsrpition bill>",
    "category_id":<int>
}
