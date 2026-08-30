const baseUrl = "https://api.freeprojectapi.com/api/BankLoan";

function getAllUsers() {

    fetch(`${baseUrl}/GetAllUsers`)
        .then(res => res.json())
        .then(data => {

            console.log(data);

            let tableBody = "";

            data.data.forEach(element => {

                tableBody += `
                    <tr>
                        <td>${element.userId}</td>
                        <td>${element.userName}</td>
                        <td>${element.emailId}</td>
                        <td>${element.fullName}</td>
                        <td>${element.role}</td>
                        <td>${element.createdDate}</td>
                    </tr>
                `;

            });

            document.getElementById("contentSection").innerHTML = `
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Full Name</th>
                            <th>Role</th>
                            <th>Created Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        ${tableBody}
                    </tbody>
                </table>
            `;

        });
}

function btnLoginOnAction() {

    let userName = document.getElementById("txtUserName").value;
    let password = document.getElementById("txtPassword").value;

    let loginData = {
        userName: userName,
        password: password
    };

    fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
    })
    .then(res => res.json())
    .then(data => {

        console.log(data);

        document.getElementById("contentSection").innerHTML = `
            <h3>Login Response</h3>
            <p>${data.message}</p>
            <a href="home.html">Go to Dashboard</a>
        `;

    })
    .catch(error => {

        console.log(error);

        document.getElementById("contentSection").innerHTML = `
            <p>Something went wrong.</p>
        `;
    });
}