a = {"b" : {"c":{},"d":{}},"e":{}}

def start():
    clear_up(a)
    print(a)

def clear_up(a):
    for i in list(a.keys()):
        if len(a[i]) > 0:
            clear_up(a[i])
        elif len(a[i]) == 0:
            del a[i]
    for i in list(a):
        if len(a[i]) == 0:
            del a[i]