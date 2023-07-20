- Hashing the user's input:
    When a user registers or attempts to log in with a password, the system takes their password as input and hashes it using Bcrypt's one-way hashing function. The hashing function is intentionally slow and resource-intensive, which helps thwart brute-force attacks.

- Retrieving the hashed password from the database:
    When a user's information is stored in the system, their password is stored as the hashed version, not in plain text. So, when a user tries to log in, the system retrieves the hashed password associated with their account from the database.

- Comparing the hashed passwords:
    To verify the user's login attempt, the system takes the password input provided by the user, hashes it using the same Bcrypt hashing function, and then compares the resulting hashed password with the one stored in the database.
    NOTE that salt rounds are stored in bcrypt to reference when dehashing.

- Result of the comparison:
    If the two hashed passwords match, the system allows the user to log in since it means the user provided the correct password. However, if the hashed passwords do not match, the login attempt is rejected, indicating that the provided password is incorrect.