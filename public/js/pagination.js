$(function() {
	$('#easyPaginate').easyPaginate({
		paginateElement: 'a',
		elementsPerPage: 12
	});

	$('#easyPaginatePhoto').easyPaginateImg({
		paginateElement: 'div',
		elementsPerPage: 1
	});
});
