# SCTE Monitoring Service - Python

Authors: @zachthomas823, @FelicianoEJ

This service uses uvicorn as ASGI (Asynchronous Server Gateway Interface) and FastAPI framework to establish a RESTful approach
to validate and monitor SCTE's.

**IMPORTANT**

The FastAPI framework has a bug under the `routing.py`
The main issue is that the framework forces JSON parsing even when `Content-Type` header value is any other than `application/json` . This causes the server to always reply with status code **422**.

Issue can be found at: https://github.com/tiangolo/fastapi/issues/1018#issue-569290517

To solve this issue the following code was replaced under the `if` statement at function `get_request_handler` :
*Before:*

``` python
if body_bytes:
    body = await request.json()
```

*After:*

``` python
if body_bytes and request.headers['Content-Type'] == 'application/json':
    body = await request.json()
else:
    body = body_bytes
```

## Start the service
To start the service first get all the dependencies.
This project was built using Python Virtual Enviroment.
You can also install the modules one by one.

``` code
pip install threefive
pip install fastapi
pip install uvicorn
```

To execute the server and start the module just run

``` code
uvicorn main:app --reload
```

About the command `uvicorn main:app --reload`
The command `uvicorn main:app` refers to:

* `main` : the file `main.py` (the Python "module").
* `app` : the object created inside of `main.py` with the line `app = FastAPI()` .
* `--reload` : make the server restart after code changes. Only do this for development.

Additional uvicorn doc:

``` code
Usage: uvicorn [OPTIONS] APP

Options:
  --host TEXT                     Bind socket to this host.  [default:
                                  127.0.0.1]
  --port INTEGER                  Bind socket to this port.  [default: 8000]
  --uds TEXT                      Bind to a UNIX domain socket.
  --fd INTEGER                    Bind to socket from this file descriptor.
  --reload                        Enable auto-reload.
```
