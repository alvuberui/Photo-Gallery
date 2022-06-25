from silence.decorators import endpoint



@endpoint(
    route="/categories",
    method="GET",
    sql="SELECT * FROM Categories"
)
def get_all():
    pass
############################

@endpoint(
    route="/categories/$categoryId",
    method="GET",
    sql="SELECT * FROM Categories WHERE categoryId=$categoryId"
)
def get_by_id():
    pass

############################

@endpoint(
    route="/categories/getByName/$name",
    method="GET",
    sql="SELECT * FROM Categories WHERE name=$name"
)
def get_name_by_name():
    pass

############################

@endpoint(
    route="/categories/getNumById/$categoryId",
    method="GET",
    sql="SELECT COUNT(*) AS numero FROM Categories WHERE categoryId=$categoryId"
)
def get_num_by_id():
    pass

############################

@endpoint(
    route="/categories/getNumByName/$name",
    method="GET",
    sql="SELECT COUNT(*) AS numero FROM Categories WHERE name=$name"
)
def get_num_by_name():
    pass

############################
@endpoint(
    route="/categories",
    method="POST",
    sql="INSERT INTO Categories (name) VALUES ($name)",
    description="Creates a new category",
    auth_required=False,
)
def create(name):
    pass


