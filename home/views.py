from django.shortcuts import render
from django.http import JsonResponse
from .forms import ContactForm

def index(request):
    return render(request, 'home/index.html')

def submit_form(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            # Process form data
            return JsonResponse({'message': 'Form submitted successfully!'})
        else:
            return JsonResponse({'errors': form.errors}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=400)
