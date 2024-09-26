from rest_framework import viewsets
from .models import Expense
from .serializers import ExpenseSerializer
from rest_framework.permissions import IsAuthenticated

class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Return expenses only for the authenticated user
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Associate the expense with the authenticated user
        serializer.save(user=self.request.user)


from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Expense, Budget
from .serializers import ExpenseSerializer, BudgetSerializer

class BudgetViewSet(viewsets.ModelViewSet):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)