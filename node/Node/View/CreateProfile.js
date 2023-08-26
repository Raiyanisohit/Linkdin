export const createProfile = (otp, firstName, lastName) => {
    return (`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            padding: 0;
        }

        .headerClass {
            width: 500px;
            margin-left: auto;
            margin-right: auto;
            display: flex;
        }

        .container {
            width: 500px;
            height: max-content;
            margin-left: auto;
            margin-right: auto;
            background-color: black;
            padding-bottom: 20px;
        }

        .linkedInHeder {
            height: 50px;
        }

        .logo {
            padding-top: 20px;
            padding-left: 50px;
        }

        .userBlock {
            color: white;
            padding-top: 22px;
            font-size: 30px;
            display: flex;
            padding-right: 50px;
            padding-left: 150px;
        }

        .userImage {
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }

        .userText {
            padding-top: 11px;
            padding-left: 75px;
            padding-right: 10px;
            font-size: 25px;
        }

        .mailText {
            color: white;
            padding-left: 50px;
        }

        .div1 {
            font-size: 20px;
            padding-top: 10px;
        }

        .div2 {
            margin-top: 10px;
            font-size: 25px;
        }

        .OTPdiv {
            padding-top: 20px;
            font-size: 30px;
            font-weight: 600;
        }

        .div3 {
            padding-top: 10px;
            font-size: 15px;
        }
        
        .div4 {
            padding-top: 20px;
        }

        @media screen and (max-width:320px) {
            .container {
                width: 100px;
            }

            .headerClass {
                width: 200px;
            }

            .mailText {
                padding-left: 10px;
            }

            .logo {
                padding-left: 10px;
            }

            .userBlock {
                padding-right: 10px;
                padding-left: 80px;
            }
        }

        @media screen and (max-width:375px) {
            .container {
                width: 350px;
            }

            .headerClass {
                width: 100%;
            }

            .logo {
                padding-left: 10px;
            }

            .userBlock {
                padding-right: 10px;
                padding-left: 80px;
            }

            .mailText {
                padding-left: 10px;
            }
        }

        @media screen and (max-width:425px) {
            .container {
                width: 350px;
            }

            .headerClass {
                width: 100%;
            }

            .logo {
                padding-left: 10px;
            }

            .mailText {
                padding-left: 20px;
            }

            .userBlock {
                padding-right: 10px;
                padding-left: 65px;
            }
        }
    </style>
</head>

<body>
    <div class="container">
        <!--div for header  -->
        <div class="headerClass">
            <div class="logo">
                <img src="https://cdn-icons-png.flaticon.com/128/3536/3536505.png"
                     alt="linkedIn Logo"
                     class='linkedInHeder' />
            </div>

            <div class="userBlock">
                <div class="userText">
                    ${firstName} ${lastName}
                </div>
            </div>
        </div>

        <hr>

        <div class="mailText">

            <div class="div2">
                Thank you for signing up
            </div>

            <div class="div3">
                Enter this code to confirm you account
            </div>

            <div class="OTPdiv">
                ${otp}
            </div>

            <div class="div4">
                Thanks for helping us keep your account secure.
            </div>
        </div>
    </div>
</body>

</html>`)
}