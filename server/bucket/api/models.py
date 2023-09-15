from django.db import models

# Create your models here.
class Paper(models.Model):
    title = models.TextField(name='Title')
    authors = models.JSONField(name='Authors', blank=False,default=list)
    abstract = models.CharField(name='Abstract', blank=False, editable=True, max_length=50000)
    pdfLink = models.URLField(name='Pdf')
    paperLink = models.URLField(name='PaperLink')
    tags = models.JSONField(name='Tags', editable=True, default=list)