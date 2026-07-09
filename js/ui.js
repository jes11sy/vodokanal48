// Навигация и модальные окна без Bootstrap
document.addEventListener('DOMContentLoaded', function() {
    const toggler = document.querySelector('.navbar-toggler');
    const collapse = document.querySelector('.navbar-collapse');

    if (toggler && collapse) {
        toggler.addEventListener('click', function() {
            collapse.classList.toggle('show');
            const expanded = collapse.classList.contains('show');
            toggler.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        });
    }

    function openModal(id) {
        const modal = document.getElementById(id);
        if (!modal) return;
        modal.classList.add('show');
        document.body.classList.add('modal-open');
    }

    function closeModal(modal) {
        modal.classList.remove('show');
        if (!document.querySelector('.modal.show')) {
            document.body.classList.remove('modal-open');
        }
    }

    document.querySelectorAll('[data-toggle="modal"]').forEach(function(trigger) {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const target = trigger.getAttribute('data-target');
            if (target && target.startsWith('#')) {
                openModal(target.slice(1));
            }
        });
    });

    document.querySelectorAll('[data-dismiss="modal"]').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const modal = btn.closest('.modal');
            if (modal) closeModal(modal);
        });
    });

    document.querySelectorAll('.modal').forEach(function(modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeModal(modal);
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.show').forEach(closeModal);
        }
    });
});
