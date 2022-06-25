from silence.decorators import endpoint



@endpoint(
    route="/ratings",
    method="GET",
    sql="SELECT * FROM Ratings"
)
def get_all():
    pass
############################

@endpoint(
    route="/ratings/$ratingId",
    method="GET",
    sql="SELECT * FROM Ratings WHERE ratingId=$ratingId"
)
def get_by_id():
    pass
###################################################
@endpoint(
    route="/ratings/byUserIdPhotoId/$photoId/$userId",
    method="GET",
    sql="SELECT * FROM Ratings WHERE photoId=$photoId AND userId=$userId"
)
def get_by_photoId_userId():
    pass
########################################################
@endpoint(
    route="/ratings/numRatingsByPhotoIdUserId/$photoId/$userId",
    method="GET",
    sql="SELECT COUNT(*) AS n FROM Ratings WHERE userId=$userId AND photoId=$photoId"
)
def get_num_by_photoId_userId():
    pass
#####################################################
@endpoint(
    route="/ratings/byPhotoId/$photoId",
    method="GET",
    sql="SELECT SUM(VALUE)/COUNT(*) AS rating FROM Ratings WHERE photoId=$photoId",
    description="Obtain rating with photoId"
)
def get_by_photoId():
    pass
########################################################
@endpoint(
    route="/ratings",
    method="POST",
    sql="INSERT INTO Ratings (value, userId, photoId) VALUES ($value, $userId, $photoId)",
    description="Creates a new rating",
    auth_required=True,
)
def create(value,userId,photoId):
    pass

###############################################################################
	
@endpoint(
    route="/ratings",
    method="PUT",
    sql="UPDATE Ratings SET value=$value WHERE userId=$userId AND photoId=$photoId",
    description="Updates an existing rating",
    auth_required=True,
)
def update(value,userId,photoId):
    pass

###############################################################################

@endpoint(
    route="/ratings/$ratingId",
    method="DELETE",
    sql="DELETE FROM Ratings WHERE ratingId = $ratingId",
    description="Removes a rating",
    auth_required=True,
)
def delete():
    pass