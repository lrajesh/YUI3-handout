import os
from zope.interface import implements
from interfaces import IJiva
from zope.container.btree import BTreeContainer
from chameleon.core.template import TemplateFile
import simplejson as json

templ = os.path.join(os.path.dirname(__file__), "templ")

class Jiva(object):
    implements(IJiva)
    
    def __init__(self,context,request):
        self.context = context
        self.request = request
        
    def index_html(self):
        """
        """
        a = TemplateFile(templ+ os.sep + 'first.html','parser').body
        return a
    
    def names(self, query):
        """
        """
        return json.dumps([{'id':1,'name':'abc','job':'bcs'},{'id':2,'name':'dsfs','job':'fds'},{'id':3,'name':'wac','job':'hdsf'}])
    
    def memresults(self):
        """
	"""
        self.request.RESPONSE.setHeader('Content-Type', 'application/json')
        call_back = self.request.get('callback','')
        bakery = self.getData()
        return json.dumps(bakery)

    def getData(self):
        """
	"""
        bakery = [
            {"pieId": "1", "type":"pecan pie", "slices": "1"},
            {"pieId": "2", "type":"pecan pie", "slices": "1"},
            {"pieId": "3", "type":"pecan pie", "slices": "1"}
        ]
        return bakery
