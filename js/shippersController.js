/**
 * Controller fornecedores
 */
$app.controller('shippersController',function ($scope,$http,$routeParams,$location) {
    var resorces = "shippers";
    var resorce = "shiper";
    $scope.page_title = "Entregadores";
	//listagem
	$scope.rows = null;
	$scope.row = null;
	//Pagination
	$scope.currentPage = 0;
	$scope.pageSize = 15;
    /**
     * Número de páginas
     */
	$scope.numberOfPages =function(){
		return Math.ceil($scope.rows.length/$scope.pageSize);
	};
    /**
     * Consulta todos os registros
     */
	$scope.loadAll = function(){
		$scope.showLoader();
		$http.get($scope.server("/"+resorces)).success(function(data){
			$scope.rows = data;
			$scope.hideLoader();
		});
	};
    /**
     * Consulta por id
     */
	$scope.loadRow = function(){
		if ($routeParams.id!==null){
			$scope.showLoader();
			$http.get($scope.server("/"+resorce+"/"+$routeParams.id)).success(function(data){
				$scope.row = data;
				$scope.row.isUpdate = true;
				$scope.hideLoader();
			});
		}else{
			$scope.row = {};
			$scope.row.customerID = null;
			$scope.row.isUpdate = false;
			$scope.hideLoader();
		}
	};
    /**
     * Salva um registro
     */
	$scope.save = function(){
		$scope.showLoader();
		$http.post($scope.server("/"+resorce),$scope.row).success(function(data){
			alert("Salvo com sucesso");
			$scope.row.isUpdate = true;
			$scope.hideLoader();
			$location.path("/"+resorces);
		});
	};
    /**
     * Exclui um registro por id
     */
	$scope.del = function(){
		if (confirm("Deseja excluir " + $scope.row.customerID + "?")){
			$http.delete($scope.server("/"+resorce+"/"+$routeParams.id)).success(function(s){
				$scope.hideLoader();
				alert("Excluído com sucesso");
				$location.path("/"+resorces);
			});
		}
	};
});
