<%--
  Created by IntelliJ IDEA.
  User: Admin
  Date: 5/6/2022
  Time: 12:48 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<html>
<head>
    <title>Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="../bootstrap413/css/bootstrap.min.css">
    <link rel="stylesheet" href="../datatables/css/dataTables.bootstrap4.css">
    <style>
        .bg-pink {
            background-color: red !important;
        }
         body{
             box-sizing: border-box;
             padding: 0px;
             border: 0px;
         }
        html{
            font-size: 12px !important;
        }
        small{
            font-size: 12px !important;
            color: black;
        }
    </style>
</head>
<body>
<nav class="navbar navbar-expand-sm navbar-dark bg-warning p-2">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">
            <img src="https://i.pinimg.com/736x/29/88/5b/29885bbba1f52e88bfdeb441e46fb454.jpg" alt="Logo" style="width:45px;" class="rounded-pill">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="mynavbar">
            <ul class="navbar-nav me-auto">
                <li class="nav-item">
                    <a class="nav-link text-white active" href="../index.jsp">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white" href="/customer">Back</a>
                </li>
            </ul>
        </div>
    </div>
</nav>

<div class="col-auto row col-12" style="margin: 0 auto;">
    <div class="bg-pink text-white col-5" style="margin: 0 auto !important; padding: 20px;">
        <form method="post">
            <div class="form-outline mb-2 w-75">
                <label class="form-label" for="form1Example2">Customer Type</label>
                <select class="form-select" aria-label="Default select example" id="form1Example2" name="customerType">
                    <option class="selected disabled">Choice Customer Type</option>
                    <c:forEach items="${listCustomerType}" var="i">
                        <option value="${i.id}">${i.name}</option>
                    </c:forEach>
                </select>
                <small>${errors.customerType}</small>

            </div>

            <div class="form-outline mb-2 w-75">
                <label class="form-label" for="form1Example1">Customer Name</label>
                <input type="text" id="form1Example1" class="form-control" name="name" value="${name}"/>
                <small>${errors.name}</small>
            </div>

            <div class="form-outline mb-2 w-75">
                <label class="form-label" for="form1Example3">Customer Birthday</label>
                <input type="date" id="form1Example3" class="form-control" name="birthDay" value="${birthDay}"/>
                <small>${errors.birthDay}</small>
            </div>

            <div class="form-outline mb-2 w-75">
                <label class="form-label" for="form1Example4">Customer Gender</label>
                <select class="form-select" aria-label="Default select example" id="form1Example4" name="gender" value="${gender}">
                    <option selected disabled>Choice Customer Gender</option>
                    <option value="1">Nam</option>
                    <option value="0">nữ</option>
                    <option value="">Other</option>
                </select>
                <small>${errors.gender}</small>
            </div>

            <div class="form-outline mb-2 w-75">
                <label class="form-label" for="form1Example5">Customer ID Card</label>
                <input type="text" id="form1Example5" class="form-control" name="idCard" value="${idCard}"/>
                <small>${errors.idCard}</small>

            </div>

            <div class="form-outline mb-2 w-75">
                <label class="form-label" for="form1Example6">Customer Phone</label>
                <input type="text" id="form1Example6" class="form-control" name="phone" value="${phone}"/>
                <small>${errors.phone}</small>

            </div>

            <div class="form-outline mb-2 w-75">
                <label class="form-label" for="form1Example7">Customer Email</label>
                <input type="text" id="form1Example7" class="form-control" name="email" value="${email}"/>
                <small>${errors.email}</small>

            </div>

            <div class="form-outline mb-2 w-75">
                <label class="form-label" for="form1Example8">Customer Address</label>
                <input type="text" id="form1Example8" class="form-control" name="address" value="${address}"/>
                <small>${errors.address}</small>
            </div>

            <button type="submit" class="btn btn-warning btn-block w-25">Submit</button>
        </form>
    </div>
    <div class="float-sm-left col-7 ">
        <a><img src="https://kenh14cdn.com/thumb_w/600/2020/4/7/anh-1-dien-canh-an-xin-1585743782738973529613-crop-1586261831765630548258-15862671390121385116029-crop-1586267232082518577707.jpg" height="553px" width="100%"></a>
    </div>
</div>

<footer class="container-fluid text-center bg-dark p-2 text-light">
    <p class="text-light" style="height: 5px">Furama Resort - &copy; Copyright by Háck Bất Tử 2022</p>
</footer>
</body>
<script src="../jquery/jquery-3.5.1.min.js"></script>
<script src="../datatables/js/jquery.dataTables.min.js"></script>
<script src="../datatables/js/dataTables.bootstrap4.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
        crossorigin="anonymous"></script>
</html>