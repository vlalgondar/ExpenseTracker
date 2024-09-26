from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ExpenseViewSet, BudgetViewSet

router = DefaultRouter()
router.register(r'expenses', ExpenseViewSet, basename='expense')
router.register(r'budgets', BudgetViewSet, basename='budget')

urlpatterns = [
    path('', include(router.urls)),
]