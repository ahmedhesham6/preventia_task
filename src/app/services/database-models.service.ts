import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseModelsService {
  getDevelopersUrl: string = 'api/developer/';
  getProjectsUrl: string = 'api/project/';
  getPropertiesUrl: string = 'api/property/';
  getAreasUrl: string = 'api/area';
  getNeighbourhoodUrl: string = 'api/neighbourhood';
  getNewsUrl: string = 'api/news';
  getAdsUrl: string = 'api/ads';
  getCountriesUrl: string = 'api/country';
  getCitiesUrl: string = 'api/city';
  uploadFileUrl: string = 'api/media/';
  uploadMediaUrl: string = 'api/media/';
  addMetaUrl: string = 'api/file/meta';
  getFileTypesUrl: string = 'api/file/type/';

  constructor(private http: HttpClient) {}

  // File Types

  // Get Developers
  getFileTypes(params): Observable<any> {
    return this.http.get<any>(this.getFileTypesUrl, { params });
  }


  // Add Developer
  addFileType(fileType): Observable<any> {
    return this.http.post<any>(this.getFileTypesUrl, fileType);
  }

  // Edit Developer
  editFileType(fileType, fileTypeId): Observable<any> {
    return this.http.patch<any>(
      `${this.getFileTypesUrl}/${fileTypeId}`,
      fileType
    );
  }

  // Upload File
  uploadFile(file): Observable<any> {
    return this.http.post<any>(this.uploadFileUrl, file);
  }

  // Upload Media
  uploadMedia(file): Observable<any> {
    return this.http.post<any>(this.uploadMediaUrl, file);
  }

  // Add Meta
  addMeta(meta): Observable<any> {
    return this.http.post<any>(this.addMetaUrl, meta);
  }

  // Edit Meta
  editMeta(meta, metaId): Observable<any> {
    return this.http.patch<any>(`${this.addMetaUrl}/${metaId}`, meta);
  }

  // Developers

  // Get Developers
  getDevelopers(params): Observable<any> {
    return this.http.get<any>(this.getDevelopersUrl, { params });
  }

  // Search Developers
  searchDevelopers(params): Observable<any> {
    return this.http.get<any>(`${this.getDevelopersUrl}/search`, { params });
  }

  // Add Developer
  addDeveloper(developer): Observable<any> {
    return this.http.post<any>(this.getDevelopersUrl, developer);
  }

  // Delete Developer
  deleteDeveloper(developerId): Observable<any> {
    return this.http.delete<any>(`${this.getDevelopersUrl}/${developerId}`);
  }

  // Edit Developer
  editDeveloper(developer, developerId): Observable<any> {
    return this.http.patch<any>(
      `${this.getDevelopersUrl}/${developerId}`,
      developer
    );
  }

  // Projects

  // Get Projects
  getProjects(params): Observable<any> {
    return this.http.get<any>(this.getProjectsUrl, { params });
  }

  // Search Projects
  searchProjects(params): Observable<any> {
    return this.http.get<any>(`${this.getProjectsUrl}/search`, { params });
  }

  // Add Project
  addProject(project): Observable<any> {
    return this.http.post<any>(this.getProjectsUrl, project);
  }

  // Delete Project
  deleteProject(projectId): Observable<any> {
    return this.http.delete<any>(`${this.getProjectsUrl}/${projectId}`);
  }

  // Edit Project
  editProject(project, projectId): Observable<any> {
    return this.http.patch<any>(`${this.getProjectsUrl}/${projectId}`, project);
  }

  // Properties

  // Search Projects
  searchProperties(params): Observable<any> {
    return this.http.get<any>(`${this.getPropertiesUrl}/search`, { params });
  }

  // Get Properties
  getProperties(params): Observable<any> {
    return this.http.get<any>(this.getPropertiesUrl, { params });
  }

  // Add Property
  addProperty(property): Observable<any> {
    return this.http.post<any>(this.getPropertiesUrl, property);
  }

  // Delete Property
  deleteProperty(propertyId): Observable<any> {
    return this.http.delete<any>(`${this.getPropertiesUrl}/${propertyId}`);
  }

  // Edit Property
  editProperty(property, propertyId): Observable<any> {
    return this.http.patch<any>(
      `${this.getPropertiesUrl}/${propertyId}`,
      property
    );
  }

  // News

  // Search Projects
  searchNews(params): Observable<any> {
    return this.http.get<any>(`${this.getNewsUrl}/search`, { params });
  }

  // Get News
  getNews(params): Observable<any> {
    return this.http.get<any>(this.getNewsUrl, { params });
  }

  // Add News
  addNews(news): Observable<any> {
    return this.http.post<any>(this.getNewsUrl, news);
  }

  // Delete News
  deleteNews(newsId): Observable<any> {
    return this.http.delete<any>(`${this.getNewsUrl}/${newsId}`);
  }

  // Edit News
  editNews(news, newsId): Observable<any> {
    return this.http.patch<any>(`${this.getNewsUrl}/${newsId}`, news);
  }

  // Ads

  // Search Projects
  searchAds(params): Observable<any> {
    return this.http.get<any>(`${this.getAdsUrl}/search/`, { params });
  }

  // Get Ads
  getAds(params): Observable<any> {
    return this.http.get<any>(this.getAdsUrl, { params });
  }

  // Add Ads
  addAds(ads): Observable<any> {
    return this.http.post<any>(this.getAdsUrl, ads);
  }

  // Delete News
  deleteAd(addId): Observable<any> {
    return this.http.delete<any>(`${this.getAdsUrl}/${addId}`);
  }

  // Edit Ads
  editAds(ads, adsId): Observable<any> {
    return this.http.patch<any>(`${this.getAdsUrl}/${adsId}`, ads);
  }

  // Countries

  // Search Projects
  searchCountries(params): Observable<any> {
    return this.http.get<any>(`${this.getCountriesUrl}/search`, { params });
  }

  // Get Countries
  getCountries(params): Observable<any> {
    return this.http.get<any>(this.getCountriesUrl, { params });
  }

  // Add Country
  addCountry(country): Observable<any> {
    return this.http.post<any>(this.getCountriesUrl, country);
  }

  // Edit Country
  editCountry(country, countryId): Observable<any> {
    return this.http.patch<any>(
      `${this.getCountriesUrl}/${countryId}`,
      country
    );
  }

  // Cities

  // Search Cities
  searchCities(params): Observable<any> {
    return this.http.get<any>(`${this.getCitiesUrl}/search`, { params });
  }

  // Get Cities
  getCities(params): Observable<any> {
    return this.http.get<any>(this.getCitiesUrl, { params });
  }

  // Add City
  addCity(city): Observable<any> {
    return this.http.post<any>(this.getCitiesUrl, city);
  }

  // Delete City
  deleteCity(cityId): Observable<any> {
    return this.http.delete<any>(`${this.getCitiesUrl}/${cityId}`);
  }

  // Edit City
  editCity(city, cityId): Observable<any> {
    return this.http.patch<any>(`${this.getCitiesUrl}/${cityId}`, city);
  }

  // Areas

  // Search Areas
  searchAreas(params): Observable<any> {
    return this.http.get<any>(`${this.getAreasUrl}/search`, { params });
  }

  // Get Areas
  getAreas(params): Observable<any> {
    return this.http.get<any>(this.getAreasUrl, { params });
  }

  // Add Area
  addArea(area): Observable<any> {
    return this.http.post<any>(this.getAreasUrl, area);
  }

  // Delete Area
  deleteArea(areaId): Observable<any> {
    return this.http.delete<any>(`${this.getAreasUrl}/${areaId}`);
  }

  // Edit Area
  editArea(area, areaId): Observable<any> {
    return this.http.patch<any>(`${this.getAreasUrl}/${areaId}`, area);
  }

  // Neighbourhoods

  // Search Neighbourhoods
  searchNeighbourhoods(params): Observable<any> {
    return this.http.get<any>(`${this.getNeighbourhoodUrl}/search`, { params });
  }

  // Get Neighbourhoods
  getNeighbourhoods(params): Observable<any> {
    return this.http.get<any>(this.getNeighbourhoodUrl, { params });
  }

  // Add Neighbourhood
  addNeighbourhood(neighbourhood): Observable<any> {
    return this.http.post<any>(this.getNeighbourhoodUrl, neighbourhood);
  }

  // Delete Neighbourhood
  deleteNeighbourhood(neighbourhoodId): Observable<any> {
    return this.http.delete<any>(
      `${this.getNeighbourhoodUrl}/${neighbourhoodId}`
    );
  }

  // Edit Neighbourhood
  editNeighbourhood(neighbourhood, neighbourhoodId): Observable<any> {
    return this.http.patch<any>(
      `${this.getNeighbourhoodUrl}/${neighbourhoodId}`,
      neighbourhood
    );
  }
}
