from silence.decorators import endpoint


############################
@endpoint(
    route="/photos",
    method="GET",
    sql="SELECT * FROM Photos ORDER BY DATE(date) DESC, TIME(date) DESC"
)
def get_all():
    pass

############################
@endpoint(
    route="/photos/index/$userId",
    method="GET",
    sql="SELECT * FROM Photos WHERE visibility='Public' OR (visibility='Private' AND userId = $userId) ORDER BY DATE(date) DESC, TIME(date) DESC"
)
def get_all_index():
    pass
############################
@endpoint(
    route="/photos/publics",
    method="GET",
    sql="SELECT * FROM Photos WHERE visibility='Public' ORDER BY DATE(date) DESC, TIME(date) DESC"
)
def get_all_publics():
    pass
############################

@endpoint(
    route="/photos/numPhotosByUserId/$userId",
    method="GET",
    sql="SELECT COUNT(*) AS numPhotos FROM Photos WHERE userId=$userId"
)
def get_num_userId():
    pass
############################

@endpoint(
    route="/photos/$photoId",
    method="GET",
    sql="SELECT * FROM Photos WHERE photoId=$photoId"
)
def get_by_id():
    pass

#################################################################################

@endpoint(
    route="/photos/getPublicsPhotosByUserId/$userId",
    method="GET",
    sql="SELECT * FROM Photos WHERE userId=$userId AND visibility='Public'"
)
def get_publicsPhotos_by_userId():
    pass

#################################################################################
@endpoint(
    route="/photos/getPrivatesPhotosByUserId/$userId",
    method="GET",
    sql="SELECT * FROM Photos WHERE userId=$userId AND visibility='Private'"
)
def get_privatesPhotos_by_userId():
    pass

#################################################################################
@endpoint(
    route="/photos",
    method="POST",
    sql="INSERT INTO Photos (title, description, url, visibility, userId) VALUES ($title, $description, $url, $visibility, $userId)",
    description="Creates a new photo",
    auth_required=True,
)
def create(title, description, url, visibility, userId):
    pass

###############################################################################
	
@endpoint(
    route="/photos/$photoId",
    method="PUT",
    sql="UPDATE Photos SET title = $title, description = $description, url = $url, visibility = $visibility, userId=$userId WHERE photoId = $photoId",
    description="Updates an existing photo",
    auth_required=True,
)
def update(title, description, url, visibility, userId):
    pass

###############################################################################

@endpoint(
    route="/photos/$photoId",
    method="DELETE",
    sql="DELETE FROM Photos WHERE photoId = $photoId",
    description="Removes a photo",
    auth_required=True,
)
def delete():
    pass
    
    
