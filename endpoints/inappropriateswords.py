from silence.decorators import endpoint

@endpoint(
    route="/InappropriatesWords",
    method="GET",
    sql="SELECT * FROM InappropriatesWords;"
)
def get_all():
    pass