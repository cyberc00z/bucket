import requests
from bs4 import BeautifulSoup

def extract_arxiv_pdf(url):
    if url.startswith("https://arxiv.org/abs/"):
        return url.replace("https://arxiv.org/abs/", "")
    elif url.startswith("https://arxiv.org/pdf/") and url.endswith(".pdf"):
        return url.replace("https://arxiv.org/pdf/", "").replace(".pdf", "")
    elif requests.get(f"https://arxiv.org/abs/{url}").status_code == 200:
        return url
    else:
        print(f"ERROR: {url} is not a valid arXiv abstract URL, PDF URL, or ID.")
        return None

def extract_paper_info(url):
    r = requests.get(url)
    
    print("Requesting user url : ",  r)
    
    soup = BeautifulSoup(r.content, 'html.parser')
    # title
    title = soup.title.text
    print("Title : ",title)
    
    # authors block
    authors_div = soup.find('div', class_='authors')
    author_links = authors_div.find_all('a')
    author_names = [link.text.strip() for link in author_links]
    authors = []
    for author in author_names:
        #print("Author : ", author)
        authors.append(author)
    
    print(" Authors : ", authors)

    # abstract text 
    abstract_blockquote = soup.find('blockquote', class_='abstract mathjax')

    abstract_text  = abstract_blockquote.get_text(strip=True)
    print("Abstract : ",abstract_text)
    
    # pdf link extraction
    pdf_link = 'https://arxiv.org/pdf/' + extract_arxiv_pdf(url) + '.pdf'
    print('Pdf Link: ', pdf_link)
    
    return title, authors, abstract_text, pdf_link

#res = extract_paper_info('https://arxiv.org/abs/2309.01488')
#print(res)