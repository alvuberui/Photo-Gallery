from silence.decorators import endpoint



@endpoint(
    route="/photoscategories",
    method="GET",
    sql="SELECT * FROM photoscategories"
)
def get_all():
    pass
############################

@endpoint(
    route="/photoscategories/$photoCategoryId",
    method="GET",
    sql="SELECT * FROM PhotosCategories WHERE photoCategoryId=$photoCategoryId"
)
def get_by_id():
    pass

################################
@endpoint(
    route="/photoscategories/numcategoryId/$photoId",
    method="GET",
    sql="SELECT COUNT(*) as num FROM PhotosCategories WHERE photoId=$photoId",
    description="Obtain num of categoryId with photoId"
)
def get_num_by_photoId():
    pass
#################################
@endpoint(
    route="/photoscategories/byPhotoId/$photoId",
    method="GET",
    sql="SELECT * FROM PhotosCategories WHERE photoId=$photoId",
    description="Obtain num of categoryId with photoId"
)
def get_by_photoId():
    pass
####################################

@endpoint(
    route="/photoscategories/getByCategoryId/$categoryId",
    method="GET",
    sql="SELECT * FROM PhotosCategories WHERE categoryId=$categoryId",
    description="Obtain num of categoryId with photoId"
)
def get_by_categoryId():
    pass
####################################

@endpoint(
    route="/photoscategories",
    method="POST",
    sql="INSERT INTO PhotosCategories (photoId, categoryId) VALUES ($photoId, $categoryId)",
    description="Creates a new photocategory",
    auth_required=True,
)
def create(photoId, categoryId):
    pass

###############################################################################

@endpoint(
    route="/photoscategories/$photoCategoryId",
    method="DELETE",
    sql="DELETE FROM Photoscategories WHERE photoCategoryId = $photoCategoryId",
    description="Removes a photocategory",
    auth_required=True,
)
def delete():
    pass

##################################################################################

@endpoint(
    route="/photoscategories/$photoId/$categoryId",
    method="DELETE",
    sql="DELETE FROM Photoscategories WHERE photoId=$photoId AND categoryId=$categoryId",
    description="Removes a photocategory",
    auth_required=True,
)
def delete_by_photoId_categoryId():
    pass