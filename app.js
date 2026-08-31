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


//-------------------Register---------
document.getElementById("registerForm").addEventListener("submit", function (event) {

    event.preventDefault();

    const userName = document.getElementById("userName").value;
    const emailId = document.getElementById("emailId").value;
    const fullName = document.getElementById("fullName").value;
    const password = document.getElementById("password").value;

    fetch("https://api.freeprojectapi.com/api/BankLoan/RegisterCustomer", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            userId: 0,
            userName: userName,
            emailId: emailId,
            fullName: fullName,
            password: password
        })

    })
        .then(res => res.json())

        .then(data => {

            if (data.result == true) {

                document.getElementById("message").innerHTML =
                    `<div class="alert alert-success">
                    Registration successful!
                </div>`;

            } else {

                document.getElementById("message").innerHTML =
                    `<div class="alert alert-danger">
                    ${data.message || "Registration failed."}
                </div>`;

            }

        })

        .catch(error => {

            console.log(error);

            document.getElementById("message").innerHTML =
                `<div class="alert alert-danger">
                Something went wrong. Please try again.
            </div>`;

        });

});

//-----------------------------Bank-register
```javascript
document.getElementById("bankRegisterForm").addEventListener("submit", function (event) {

    event.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const userName = document.getElementById("userName").value;
    const emailId = document.getElementById("emailId").value;
    const password = document.getElementById("password").value;

    fetch("https://api.freeprojectapi.com/api/BankLoan/RegisterAsBankUser", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            userId: 0,
            userName: userName,
            emailId: emailId,
            fullName: fullName,
            password: password
        })

    })

    .then(function (response) {
        return response.json();
    })

    .then(function (data) {

        console.log(data);

        if (data.result == true) {

            document.getElementById("message").innerHTML =
                `< div class="alert alert-success" >
    Bank user registered successfully!
                </div > `;

        } else {

            document.getElementById("message").innerHTML =
                `< div class="alert alert-danger" >
    ${ data.message || "Registration failed." }
                </div > `;

        }

    })

    .catch(function (error) {

        console.log(error);

        document.getElementById("message").innerHTML =
            `< div class="alert alert-danger" >
    Something went wrong.Please try again.
            </div > `;

    });

});
```
    //-----------------update-user---------------

    ```javascript
const API_BASE = "https://api.freeprojectapi.com/api/BankLoan";

// Get user ID from URL
const params = new URLSearchParams(window.location.search);
const userId = params.get("id");

// If there is no user ID
if (!userId) {

    document.getElementById("message").innerHTML =
        `< div class="alert alert-danger" >
    User ID not found.
        </div > `;

} else {

    // Put user ID into hidden input
    document.getElementById("userId").value = userId;

    // Get all users and find the selected user
    fetch(`${ API_BASE }/GetAllUsers`)
        .then(response => response.json())
    .then(data => {

        if (data.result === true) {

            const user = data.data.find(
                u => u.userId == userId
            );

            if (user) {

                document.getElementById("userName").value =
                    user.userName || "";

                document.getElementById("emailId").value =
                    user.emailId || "";

                document.getElementById("fullName").value =
                    user.fullName || "";

                document.getElementById("role").value =
                    user.role || "";

                document.getElementById("password").value =
                    user.password || "";

            } else {

                document.getElementById("message").innerHTML =
                    `<div class="alert alert-danger">
                            User not found.
                        </div>`;
            }

        }

    })
    .catch(error => {

        console.log(error);

        document.getElementById("message").innerHTML =
            `<div class="alert alert-danger">
                    Error loading user.
                </div>`;
    });
}


// Update user
document.getElementById("updateUserForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();

        const userData = {

            userId: Number(document.getElementById("userId").value),

            userName: document.getElementById("userName").value,

            emailId: document.getElementById("emailId").value,

            fullName: document.getElementById("fullName").value,

            role: document.getElementById("role").value,

            createdDate: new Date().toISOString(),

            password: document.getElementById("password").value,

            projectName: "Bank Loan",

            refreshToken: "",

            refreshTokenExpiryTime: new Date().toISOString()
        };


        fetch(`${API_BASE}/UpdateUser`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(userData)

        })

            .then(response => response.json())

            .then(data => {

                console.log(data);

                if (data.result === true) {

                    document.getElementById("message").innerHTML =
                        `<div class="alert alert-success">
                        User updated successfully.
                    </div>`;

                } else {

                    document.getElementById("message").innerHTML =
                        `<div class="alert alert-danger">
                        ${data.message}
                    </div>`;
                }

            })

            .catch(error => {

                console.log(error);

                document.getElementById("message").innerHTML =
                    `<div class="alert alert-danger">
                    Something went wrong.
                </div>`;
            });

    });
```


//--------------------- all-applications.html 

function getAllApplications() {

    const table = document.getElementById("applicationsTable");
    const loading = document.getElementById("loading");
    const errorMessage = document.getElementById("errorMessage");

    // Clear old data
    table.innerHTML = "";
    errorMessage.classList.add("d-none");

    loading.style.display = "block";

    fetch("https://api.freeprojectapi.com/api/BankLoan/GetAllApplications")
        .then(res => res.json())
        .then(data => {

            loading.style.display = "none";

            if (data.result == true) {

                data.data.forEach(application => {
                    console.log("Hi"); //---------

                    let status = application.applicationStatus;

                    // Handle null status
                    if (status == null) {
                        status = "Not Updated";
                    }

                    // Status badge
                    let statusBadge = "";

                    if (status.toLowerCase() == "approved" ||
                        status.toLowerCase() == "approve") {

                        statusBadge =
                            `< span class="badge bg-success" > ${ status }</span > `;

                    } else if (status.toLowerCase() == "reject" ||
                               status.toLowerCase() == "rejected") {

                        statusBadge =
                            `< span class="badge bg-danger" > ${ status }</span > `;

                    } else if (status.toLowerCase() == "pending") {

                        statusBadge =
                            `< span class="badge bg-warning text-dark" > ${ status }</span > `;

                    } else {

                        statusBadge =
                            `< span class="badge bg-secondary" > ${ status }</span > `;
                    }

                    // Format date
                    const date = new Date(application.dateApplied);

                    const formattedDate = date.toLocaleDateString();

                    // Create table row
                    table.innerHTML += `
    < tr >

                            <td>${application.applicantID}</td>

                            <td>${formattedDate}</td>

                            <td>${application.fullName}</td>

                            <td>${application.email}</td>

                            <td>${application.employmentStatus}</td>

                            <td>${application.customerPhone}</td>

                            <td>${application.assignedToBankEmployee}</td>

                            <td>${application.panCard}</td>

                            <td>${statusBadge}</td>

                        </tr >
    `;
                    
                    
                });

            } else {

                errorMessage.textContent =
                    data.message || "Unable to load applications.";

                errorMessage.classList.remove("d-none");
            }

        })
        .catch(error => {

            console.error("Error:", error);

            loading.style.display = "none";

            errorMessage.textContent =
                "Something went wrong while loading applications.";

            errorMessage.classList.remove("d-none");
        });
    console.log("Hi");    
}


//-------my-application---------------

function loadMyApplications() {

    // Get customer ID from localStorage
    const customerId = localStorage.getItem("customerId");

    if (!customerId) {
        window.location.href = "login.html";
        return;
    }

    const loadingMessage = document.getElementById("loadingMessage");
    const errorMessage = document.getElementById("errorMessage");
    const applicationsContainer = document.getElementById("applicationsContainer");
    const noApplications = document.getElementById("noApplications");

    fetch(`https://api.freeprojectapi.com/api/BankLoan/GetMyApplications?customerId=${customerId}`)
        .then(response => response.json())
    .then(data => {

        loadingMessage.classList.add("d-none");

        console.log("My Applications:", data);

        if (data.result === true) {

            if (!data.data || data.data.length === 0) {

                noApplications.classList.remove("d-none");
                return;
            }

            data.data.forEach(application => {

                const card = document.createElement("div");

                card.className = "col-md-6 col-lg-4";

                card.innerHTML = `
                        <div class="card shadow-sm border-0 h-100">

                            <div class="card-body">

                                <h5 class="card-title fw-bold">
                                    Loan Application
                                </h5>

                                <hr>

                                <p>
                                    <strong>Application ID:</strong>
                                    ${application.applicantID ?? "N/A"}
                                </p>

                                <p>
                                    <strong>Customer Name:</strong>
                                    ${application.customerName ?? "N/A"}
                                </p>

                                <p>
                                    <strong>Phone:</strong>
                                    ${application.customerPhone ?? "N/A"}
                                </p>

                                <p>
                                    <strong>Loan Amount:</strong>
                                    ${application.loanAmount ?? "N/A"}
                                </p>

                                <p>
                                    <strong>Status:</strong>
                                    <span class="badge bg-warning text-dark">
                                        ${application.status ?? "Pending"}
                                    </span>
                                </p>

                            </div>

                        </div>
                    `;

                applicationsContainer.appendChild(card);

            });

        } else {

            errorMessage.textContent =
                data.message || "Unable to load applications.";

            errorMessage.classList.remove("d-none");
        }

    })
    .catch(error => {

        console.error("Error:", error);

        loadingMessage.classList.add("d-none");

        errorMessage.textContent =
            "An error occurred while loading your applications.";

        errorMessage.classList.remove("d-none");
    });
}


// Run when page loads
loadMyApplications();

//------------------------assigned-applications.html-------

const baseUrl = "https://api.freeprojectapi.com/api/BankLoan";

// Load assigned applications when page opens
document.addEventListener("DOMContentLoaded", function () {
    loadAssignedApplications();
});


async function loadAssignedApplications() {

    const loading = document.getElementById("loading");
    const errorMessage = document.getElementById("errorMessage");
    const noApplications = document.getElementById("noApplications");
    const applicationsContainer =
        document.getElementById("applicationsContainer");

    // Reset UI
    loading.classList.remove("d-none");
    errorMessage.classList.add("d-none");
    noApplications.classList.add("d-none");
    applicationsContainer.innerHTML = "";

    try {

        // Get bank employee ID
        const bankEmployeeId = localStorage.getItem("bankEmployeeId");

        if (!bankEmployeeId) {
            throw new Error("Bank employee ID was not found.");
        }

        // API URL
        const url =
            `${baseUrl}/GetApplicationAssigneedToMe?bankEmployeeId=${bankEmployeeId}`;

        console.log("Request URL:", url);
        console.log("Bank Employee ID:", bankEmployeeId);

        // Call API
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const result = await response.json();

        console.log("API Response:", result);

        // Hide loading
        loading.classList.add("d-none");

        // Check API result
        if (!result.result) {
            throw new Error(result.message || "Unable to load applications.");
        }

        // Get application list
        const applications = result.data || [];

        console.log("Assigned Applications:", applications);

        // Check empty list
        if (applications.length === 0) {
            noApplications.classList.remove("d-none");
            return;
        }

        // Display applications
        applications.forEach(application => {

            const card = document.createElement("div");

            card.className = "col-md-6 col-lg-4";

            card.innerHTML = `
                <div class="card h-100 shadow-sm">

                    <div class="card-body">

                        <h5 class="card-title">
                            Application #${application.applicationId ?? application.applicantID ?? "N/A"}
                        </h5>

                        <hr>

                        <p>
                            <strong>Applicant ID:</strong>
                            ${application.applicantID ?? "N/A"}
                        </p>

                        <p>
                            <strong>Customer Name:</strong>
                            ${application.customerName ?? "N/A"}
                        </p>

                        <p>
                            <strong>Customer Phone:</strong>
                            ${application.customerPhone ?? "N/A"}
                        </p>

                        <p>
                            <strong>Loan Amount:</strong>
                            ${application.loanAmount ?? "N/A"}
                        </p>

                        <p>
                            <strong>Status:</strong>
                            <span class="badge bg-warning text-dark">
                                ${application.status ?? "Pending"}
                            </span>
                        </p>

                        <p>
                            <strong>Date:</strong>
                            ${application.date ?? "N/A"}
                        </p>

                    </div>

                    <div class="card-footer bg-white">

                        <button
                            class="btn btn-primary w-100"
                            onclick='viewApplication(${JSON.stringify(application)})'>
                            View Application
                        </button>

                    </div>

                </div>
            `;

            applicationsContainer.appendChild(card);
        });

    } catch (error) {

        console.error("Error:", error);

        loading.classList.add("d-none");

        errorMessage.textContent =
            error.message || "Something went wrong.";

        errorMessage.classList.remove("d-none");
    }
}


// View application
function viewApplication(application) {

    console.log("Selected Application:", application);

    // Save selected application
    localStorage.setItem(
        "selectedApplication",
        JSON.stringify(application)
    );

    // Open details page
    window.location.href = "application-details.html";
}

//--------------------check application

function checkApplicationStatus() {

    let panNo = document.getElementById("panNo").value;
    let status = document.getElementById("status").value;

    if (panNo === "" || status === "") {
        document.getElementById("result").innerHTML = `
            <div class="alert alert-warning">
                Please enter PAN number and select application status.
            </div>
        `;

        return;
    }

    let url = `https://api.freeprojectapi.com/api/BankLoan/CheckApplicationStatus?panNo=${panNo}&status=${status}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {

            console.log(data);

            if (data.result === true) {

                document.getElementById("result").innerHTML = `
                    <div class="alert alert-success">
                        <h5>Application Status</h5>
                        <p>${data.message}</p>
                    </div>
                `;

            } else {

                document.getElementById("result").innerHTML = `
                    <div class="alert alert-danger">
                        ${data.message}
                    </div>
                `;
            }

        })
        .catch(error => {

            console.log(error);

            document.getElementById("result").innerHTML = `
                <div class="alert alert-danger">
                    Something went wrong. Please try again.
                </div>
            `;

        });
}

//--------------------new-application
const applicationForm = document.getElementById("applicationForm");
const message = document.getElementById("message");

applicationForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    // Get customer ID from localStorage
    const customerId = localStorage.getItem("customerId");

    if (!customerId) {
        message.innerHTML = `
            <div class="alert alert-danger">
                Customer ID not found. Please login first.
            </div>
        `;
        return;
    }

    const applicationData = {

        applicantID: 0,

        fullName: document.getElementById("fullName").value,

        applicationStatus: "Pending",

        panCard: document.getElementById("panCard").value,

        dateOfBirth:
            document.getElementById("dateOfBirth").value + "T00:00:00",

        email: document.getElementById("email").value,

        phone: document.getElementById("phone").value,

        address: document.getElementById("address").value,

        city: document.getElementById("city").value,

        state: document.getElementById("state").value,

        zipCode: document.getElementById("zipCode").value,

        annualIncome:
            Number(document.getElementById("annualIncome").value),

        employmentStatus:
            document.getElementById("employmentStatus").value,

        creditScore:
            Number(document.getElementById("creditScore").value),

        assets:
            document.getElementById("assets").value,

        dateApplied: new Date().toISOString(),

        loans: [],

        customerId: Number(customerId)
    };


    try {

        message.innerHTML = `
            <div class="alert alert-info">
                Submitting application...
            </div>
        `;

        const response = await fetch(
            "https://api.freeprojectapi.com/api/BankLoan/AddNewApplication",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(applicationData)
            }
        );


        const data = await response.json();

        console.log("Application response:", data);


        if (data.result === true) {

            message.innerHTML = `
                <div class="alert alert-success">
                    ${data.message || "Loan application submitted successfully."}
                </div>
            `;

            applicationForm.reset();

        } else {

            message.innerHTML = `
                <div class="alert alert-danger">
                    ${data.message || "Unable to submit application."}
                </div>
            `;
        }

    } catch (error) {

        console.error("Error:", error);

        message.innerHTML = `
            <div class="alert alert-danger">
                Something went wrong while submitting the application.
            </div>
        `;
    }

});
