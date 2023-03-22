## REGISTER REQUEST

url: "http://localhost:8080/auth/register"
method: "POST"

```json
{
  "firstName": "your_first_name",
  "lastName": "your_last_name",
  "email": "your_e_mail",
  "password": "your_password",
  "dateOfBirth": "your_date_of_birth",
  "gender": "male"
}
```

## LOGIN REQUEST

url: "http://localhost:8080/auth/login"
method: "POST"

```json
{
  "emailOrUsername": "your_email_or_username",
  "password": "your_password"
}
```
