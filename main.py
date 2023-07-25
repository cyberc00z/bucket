import requests
import os
import typer

import google.auth
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from googleapiclient.http import MediaFileUpload

app = typer.Typer()

def download_paper(link):
   """
    Ask user for link and check if the paper exists there
    download it otherwise return 'No paper found'
 
   """
   download_folder = './downloads'
   if not os.path.exists(download_folder):
      os.makedirs(download_folder)
   pdf_filename = os.path.join(download_folder, os.path.basename('download'))
   try:
      timeout = 10
      response = requests.get(link, timeout=timeout)
      print(response)
      response.raise_for_status()
       
      with open(pdf_filename, 'wb') as pdf_file:
         pdf_file.write(response.content)
    
      return "PDF downloaded successfully"
   
   except requests.exceptions.Timeout:
      return "Request timed out. Please try again later"
   
   except requests.exceptions.RequestException as e:
      return f'Error occured : {e}' 

   except Exception as err:
      return f'No Paper found! : {err}' 

def upload_to_folder(folder_id,paper_path):
    
    """
    login to drive
    """
    creds, _ = google.auth.default()
    
    try:
      # create drive api client
      service = build('drive','v3',credential=creds)
     
      file_metadata = {
           'name': 'paper.pdf',
           'parents': [folder_id]
      }
      media = MediaFileUpload('downloads/download.pdf',mimetype='application/pdf', resumable=True)
      file = service.files().create(body=file_metadata, media_body=media, fields='id').execute()
      
      print(F'File ID : "{file.get("id")}".')
      return file.get('id')

    except HttpError as error:
      print(F'An error occurred : {error}')
      return None


if __name__ == '__main__':
   download_paper('https://arxiv.org/pdf/2307.11078.pdf')
   upload_to_folder(folder_id="1PalSOkipZmh47-iT7bnHsFJe_6XTqlkT")
