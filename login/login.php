

<!DOCTYPE html>
<html lang="en">
<head>
  <title>Darts :: Login</title>
  <link rel="stylesheet" href="..\styles\login.css">
</head>
<body class='login-body'>
        <div class="logo-container">
            <img src="../images\darts_logo.webp" alt="Logo" class="logo-pic">
        </div>
        <div class="login-container-background-out">
            <div class="login-container-background-ins">
                <div class="login-container">
                <?php
                if (isset($_POST["login"])) {
                    $email_address = $_POST["email"];
                    $password = $_POST["password"];
                
                    require_once "../includes/dbconnect.php";
                
                    // Debugging: Check if connection is working
                    if (!$myPDO) {
                        die("Database connection failed: " . implode(":", $myPDO->errorInfo()));
                    }
                  
                    try {
                        $sql = "SELECT * FROM Staff WHERE email = :email";  
                        $stmt = $myPDO->prepare($sql);
                        $stmt->bindParam(':email', $email_address, PDO::PARAM_STR);
                        $stmt->execute();

                        if ($stmt) {
                            $user = $stmt->fetch(PDO::FETCH_ASSOC);
                            if ($user) {
                                if ($password == $user["password"]) {

                                    // Insert the token into the database
                                    $stmt = $myPDO->prepare("INSERT INTO staff_tokens (staff_id, role_name, token) VALUES (?, ?, ?)");
                                    

                                    
                                    

                                    $_SESSION['user_role'] = $user['role_id'];
                                    $_SESSION['user_firstName'] = $user['f_name'];
                                    $_SESSION['user_surname'] = $user['l_name'];
                                    $_SESSION['email_address'] = $user['email'];
                                    $_SESSION['user_id'] = $user['staff_id'];
                                    $_SESSION['branch_id'] = $user['branch_id'];
                                    

                                    
                                    if ($user['role_id'] == 1) {
                                        $stmt->execute([$user['staff_id'], 'employee', $token]);
                                        header("Location: ../employee/sales_index.php"); 
                                    } elseif ($user['role_id'] == 2) {
                                        $stmt->execute([$user['staff_id'], 'stockManager', $token]);
                                        header("Location: ../stockManager/productsView.php");
                                    } elseif ($user['role_id'] == 3) {
                                        $stmt->execute([$user['staff_id'], 'manager', $token]);
                                        header("Location: ../manager/viewStaff.php");
                                    } elseif ($user['role_id'] == 4) {
                                        $stmt->execute([$user['staff_id'], 'director', $token]);
                                        header("Location: ../director/director_home.php");
                                    } elseif ($user['role_id'] == 5) {
                                        $stmt->execute([$user['staff_id'], 'admin', $token]);
                                        header("Location: ../admin/access_users.php");
                                    }
                                    die();
                                } else {
                                    echo "<p class='error_message'>Invalid Email or Password</p>";
                                }
                            } else {
                                echo "<p class='error_message'>Invalid Email or Password</p>";
                            }
                        } else {
                            echo "Error with the SQL query: " . implode(":", $myPDO->errorInfo());
                        }
                    } catch (PDOException $e) {
                        echo "PDO Error: " . $e->getMessage();
                    }
                }
                ?>

                <form action="login.php" method="post">
                  <input type="email" name="email" placeholder="Email Address" required>
                  <input type="password" name="password" placeholder="Password" required>
                  <input type="submit" value="Login" name="login">

                  <a href="" class="forgot-password">Forgot Password?</a> <!-- Contact admin for now-->
                </form>
                </div>
            </div>
        </div>
</body>
</html>
