from silence.decorators import endpoint

@endpoint(
    route="/users",
    method="GET",
    sql="SELECT * FROM Users"
)
def get_all():
    pass
############################

@endpoint(
    route="/users/$userId",
    method="GET",
    sql="SELECT * FROM Users WHERE userId=$userId"
)
def get_by_id():
    pass


##############################################################################

@endpoint(
    route="/users/getByUsername/$username",
    method="GET",
    sql="SELECT *, COUNT(*) AS num FROM Users WHERE username=$username",
    description="Select * from username"
)
def get_by_id():
    pass

##############################################################################

@endpoint(
    route="/users",
    method="POST",
    sql="INSERT INTO Users (name, surname, telephone, username, password, profilePhoto, email) VALUES ($name, $surname, $telephone, $username, $password, $profilePhoto, $email)",
    description="Creates a new user",
    auth_required=True,
)
def create(name, surname, telephone, username, password, profilePhoto, email):
    pass

###############################################################################
	
@endpoint(
    route="/users/$userId",
    method="PUT",
    sql="UPDATE Photos SET name = $name, surname = $surname, url = $telephone, username = $username, password = $password, profilePhoto = $profilePhoto, email=$email WHERE userId = $userId",
    description="Updates an existing user",
    auth_required=True,
)
def update(name, surname, telephone, username, password, profilePhoto, email):
    pass

###############################################################################

@endpoint(
    route="/users/$userId",
    method="DELETE",
    sql="DELETE FROM Users WHERE userId = $userId",
    description="Removes a user",
    auth_required=True,
)
def delete():
    pass