from rest_framework.serializers import ModelSerializer
from .models import Task, Category

class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class TaskSerializer(ModelSerializer):
    category = CategorySerializer(read_only=True)
    class Meta:
        model = Task
        fields = '__all__'

"""     def update(self, instance, validated_data):
        category = validated_data.pop('category')
        instance.category_id = category.id
        return instance """
