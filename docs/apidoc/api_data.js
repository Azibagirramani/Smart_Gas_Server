define({ "api": [
  {
    "type": "post",
    "url": "/",
    "title": "Create a user Account",
    "version": "1.0.0",
    "name": "Create_Account",
    "group": "Order",
    "description": "<p>Create a User Account</p>",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>The user name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The user password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "confirmationPassword",
            "description": "<p>user confirmationPassword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>The Users city</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "user_type",
            "description": "<p>The user type</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {\n   \"name\": \"kimmy wesley\",\n   \"password\": \"password\",\n   \"confirmationPassword\": \"confirmationPassword\",\n   \"email\": \"email@email.com\",\n   \"city\": \"Cairo\",\n   \"type\": \"REGULAR | ADMIN | SUPER_ADMIN\"\n}\n\n$http.post(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Boolean",
            "optional": false,
            "field": "saved",
            "description": "<p>Boolean to determine if user was saved successfully</p>"
          },
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The id of the saved user (id they were saved)</p>"
          },
          {
            "group": "Success 201",
            "type": "List",
            "optional": false,
            "field": "errors",
            "description": "<p>list of errors that were found with the data (if any)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": " HTTPS 201 OK\n {\n  \"saved\": true|false,\n  \"id\": \"id\",\n   \"errors\": []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/order.js",
    "groupTitle": "Order",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the endpoint.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Unauthorized response:",
          "content": "HTTP 401 Unauthorized\n{\n  \"message\": \"Invalid credentials\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/",
    "title": "Create a user Account",
    "version": "1.0.0",
    "name": "Create_Account",
    "group": "User",
    "description": "<p>Create a User Account</p>",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>The user name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The user password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "confirmationPassword",
            "description": "<p>user confirmationPassword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The Users email</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>The user phone number</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {\n   \"password\": \"password\",\n   \"confirmationPassword\": \"confirmationPassword\",\n   \"email\": \"email@email.com\",\n   \"phone\": 077771771\n}\n\n$http.post(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Boolean",
            "optional": false,
            "field": "saved",
            "description": "<p>Boolean to determine if user was saved successfully</p>"
          },
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The id of the saved user (id they were saved)</p>"
          },
          {
            "group": "Success 201",
            "type": "List",
            "optional": false,
            "field": "errors",
            "description": "<p>list of errors that were found with the data (if any)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": " HTTPS 201 OK\n {\n  \"saved\": true|false,\n  \"id\": \"id\",\n   \"errors\": []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the endpoint.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Unauthorized response:",
          "content": "HTTP 401 Unauthorized\n{\n  \"message\": \"Invalid credentials\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/:id",
    "title": "Delete a user Account",
    "version": "1.0.0",
    "name": "Delete_Account",
    "group": "User",
    "description": "<p>Delete a User Account</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The user identifier</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {\n}\n\n$http.defaults.headers.common[\"Authorization\"] = token;\n$http.post(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Boolean",
            "optional": false,
            "field": "updated",
            "description": "<p>Boolean to determine if user was deleted successfully</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response",
          "content": " HTTPS 201 OK\n {\n  \"deleted\": true\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the endpoint.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Unauthorized response:",
          "content": "HTTP 401 Unauthorized\n{\n  \"message\": \"Invalid credentials\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/:id",
    "title": "Edit a user Account",
    "version": "1.0.0",
    "name": "Edit_Account",
    "group": "User",
    "description": "<p>Edit a User Account</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The user identifier</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {\n   \"email\": \"email@email.com\",\n   \"phone\": 077771771\n}\n\n$http.defaults.headers.common[\"Authorization\"] = token;\n$http.post(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Boolean",
            "optional": false,
            "field": "updated",
            "description": "<p>Boolean to determine if user was updated successfully</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response",
          "content": " HTTPS 201 OK\n {\n  \"updated\": true,\n  \"errors\": []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the endpoint.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Unauthorized response:",
          "content": "HTTP 401 Unauthorized\n{\n  \"message\": \"Invalid credentials\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/:id",
    "title": "Get a user Account Details",
    "version": "1.0.0",
    "name": "Get_Details",
    "group": "User",
    "description": "<p>Get a user Account Details</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The user identifier</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {\n}\n\n$http.defaults.headers.common[\"Authorization\"] = token;\n$http.post(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Object",
            "optional": false,
            "field": "profile",
            "description": "<p>an object with the user details</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response",
          "content": " HTTPS 201 OK\n {\n  \"profile\": { name: \"\", email: \"\", role: \"\",... }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the endpoint.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Unauthorized response:",
          "content": "HTTP 401 Unauthorized\n{\n  \"message\": \"Invalid credentials\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/login",
    "title": "Log a user in",
    "version": "1.0.0",
    "name": "Login",
    "group": "User",
    "description": "<p>log a user in given their email and password</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The user identifier</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {\n   \"email\": \"xx14@gmail.com\",\n   \"password\": \"xx0xx1xx2\"\n}\n\n$http.defaults.headers.common[\"Authorization\"] = token;\n$http.post(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>a Jwt token that a user should use to access privileged resources</p>"
          },
          {
            "group": "Success 201",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>the user that logged in</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response",
          "content": " HTTPS 201 OK\n {\n  \"token\": true,\n  \"user\": { name: \"\", email: \"\", role: \"\",... }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the endpoint.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Unauthorized response:",
          "content": "HTTP 401 Unauthorized\n{\n  \"message\": \"Invalid credentials\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/logout",
    "title": "Log a user out",
    "version": "1.0.0",
    "name": "Logout",
    "group": "User",
    "description": "<p>log a user out given their Jwt token</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {\n}\n\n$http.defaults.headers.common[\"Authorization\"] = token;\n$http.post(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>a Jwt token that's invalidated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response",
          "content": " HTTPS 201 OK\n {\n  \"token\": true\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the endpoint.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Unauthorized response:",
          "content": "HTTP 401 Unauthorized\n{\n  \"message\": \"Invalid credentials\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/:id/reset-password",
    "title": "Edit a user Account Password",
    "version": "1.0.0",
    "name": "Reset_Password",
    "group": "User",
    "description": "<p>Edit a user Account Password</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The user identifier</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {\n   \"password\": \"xx1xx2xx4\",\n   \"old_password\": \"xx0xx1xx2\"\n}\n\n$http.defaults.headers.common[\"Authorization\"] = token;\n$http.post(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Boolean",
            "optional": false,
            "field": "updated",
            "description": "<p>Boolean to determine if user was updated successfully</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response",
          "content": " HTTPS 201 OK\n {\n  \"updated\": true,\n  \"errors\": []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the endpoint.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Unauthorized response:",
          "content": "HTTP 401 Unauthorized\n{\n  \"message\": \"Invalid credentials\"\n}",
          "type": "json"
        }
      ]
    }
  }
] });
