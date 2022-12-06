function send(id)
{
    const form = document.createElement('form');
    form.method = 'post';
    form.action = '/searchflights/flightdetails';

    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'id';
    input.value = id;
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
}