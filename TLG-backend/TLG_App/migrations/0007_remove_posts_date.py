# Generated by Django 4.0.4 on 2022-06-21 04:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('TLG_App', '0006_posts_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='posts',
            name='date',
        ),
    ]