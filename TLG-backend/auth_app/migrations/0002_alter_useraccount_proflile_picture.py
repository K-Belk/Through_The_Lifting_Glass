# Generated by Django 4.0.4 on 2022-06-15 02:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useraccount',
            name='proflile_picture',
            field=models.ImageField(null=True, upload_to='profile_pictures/'),
        ),
    ]