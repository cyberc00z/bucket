from api.serializers import PaperSerializer
from rest_framework.views import APIView 
from api.script import extract_paper_info
from rest_framework.response import Response
from rest_framework import status, viewsets
from api.models import Paper


class PaperViewSet(viewsets.ModelViewSet):
    """ 
    # API endpoint
    # """
    queryset = Paper.objects.all()
    serializer_class = PaperSerializer
    
    # Check if the paper already exists
   

    
    
    # def post(self, request):
    #     # deserializer the JSON data using your PaperSerializer
        
    #     serializer = PaperSerializer(data=request.data)
        
    #     try:
    #         serializer.is_valid(raise_exception=True)
    #     except Exception as err:
    #         return Response({'error': str(err)}, status=status.HTTP_400_BAD_REQUEST)
        
        
    #     serializer.save()
    #     return Response(serializer.data,status=status.HTTP_201_CREATED)
    
class PaperFetchView(APIView):
    def get(self, request):
        print("Request data : ", request)
        req = request.query_params.get('url')
        print("Url : ", req)
        
        # Check if the paper already exists in the database
        if Paper.objects.filter(PaperLink=req).exists():
            paper = Paper.objects.get(PaperLink=req)
            serializer = PaperSerializer(paper)
            print("Data is outputing from here : ", serializer)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        # If the paper doesn't exist, fetch the details from the source
        ret = extract_paper_info(req)
        
        if ret:
            return Response(ret, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Paper data can't be extracted from source."}, status=status.HTTP_404_NOT_FOUND)
