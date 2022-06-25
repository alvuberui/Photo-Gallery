from silence.decorators import endpoint

@endpoint(
    route="/comments",
    method="GET",
    sql="SELECT * FROM Comments ORDER BY DATE(date), TIME(date) ASC"
)
def get_all():
    pass
############################
@endpoint(
    route="/comments/$commentId",
    method="GET",
    sql="SELECT * FROM Comments WHERE commentId=$commentId"
)
def get_by_id():
    pass
#################################################
@endpoint(
    route="/comments/numByPhotoId/$photoId",
    method="GET",
    sql="SELECT COUNT(*) AS n FROM Comments WHERE photoId=$photoId"
)
def get_num_by_photoId():
    pass
#################################################
@endpoint(
    route="/comments/fromPhotoId/$photoId",
    method="GET",
    sql="SELECT * FROM Comments WHERE photoId=$photoId"
)
def get_by_photoId():
    pass
#################################################
@endpoint(
    route="/comments",
    method="POST",
    sql="INSERT INTO Comments (text, photoId, userId) VALUES ($text, $photoId, $userId)",
    description="Creates a new comment",
    auth_required=True,
)
def create(text, photoId, userId):
    pass

###############################################################################
    
    
