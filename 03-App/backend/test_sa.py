import sys
import traceback
import sqlalchemy.util.typing as sa_typing
import functools
import operator

def patched_make_union_type(*types_args):
    if len(types_args) == 1:
        return types_args[0]
    return functools.reduce(operator.or_, types_args)

sa_typing.make_union_type = patched_make_union_type

try:
    from app.models.notification import Notification
    print("Success!")
except Exception as e:
    traceback.print_exc()
