class Node(object):
    def __init__(self, key, val, next):
        self.key = key
        self.val = val
        self.next = next

class SequentialSearchST(object):
    first = None 
    def __init__(self):
        pass

    def get(self, key):
        first = self.first
        while first:
            if first.key == key:
                return first.val

            first = first.next

        return None

    def put(self, key, val):
        first = self.first
        while first:
            if first.key == key:
                first.val = val
                return
            first = first.next

        node = Node(key, val, self.first)
        print "now first is %s" % self.first 
        self.first = node

st = SequentialSearchST()
st.put("a", "aaa")
st.put("b", "bbb")
st.put("c", "ccc")
print st.get("c")
print st.get("a")
print st.first
